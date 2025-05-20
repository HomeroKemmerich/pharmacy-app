import { RenderBubble } from "@/components/renderers/RenderBubble";
import { clearChatHistory, loadChatHistory, saveChatHistory } from "@/utils/chatStorage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { ActionsProps, GiftedChat, IMessage } from "react-native-gifted-chat";
import { v4 as uuidv4 } from 'uuid';
import { CameraButton } from "../components/CameraButton";
import { generateAIContent } from '../utils/gemini';

const CHAT_BOT = {
  _id: 0,
  name: 'farmac.ia'
}
const USER_ID = 1

export default function Index() {
  const { uri } = useLocalSearchParams();
  const router = useRouter();

  const normalizedUri = Array.isArray(uri) ? uri[0] : uri;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    _id: USER_ID,
    name: 'User'
  })
  const [messages, setMessages] = useState([
    {
      _id: getMessageId(),
      text: `Olá ${user.name}! Como posso te ajudar?`,
      createdAt: new Date(),
      user: CHAT_BOT,
    },
  ]);

  //Gerenciamento do histórico do chat
  useEffect(() => {
    (async () => {
      const history = await loadChatHistory();
      if (history && history.length > 0) {
        const ordered = history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setMessages(ordered);
      } else {
        setMessages([
          {
            _id: getMessageId(),
            text: `Olá ${user.name}! Como posso te ajudar?`,
            createdAt: new Date(),
            user: CHAT_BOT,
          },
        ])
      }
      setLoading(false);
    })();
  }, [])

  const onSend = async (newMessages: IMessage[]) => {
    const updatedMessages = GiftedChat.append(messages, newMessages)
    setMessages(updatedMessages);
    await saveChatHistory(updatedMessages);

    const userMessage = newMessages[0].text;
    const botResponse = await generateAIContent(userMessage, normalizedUri);

    const botMessage: IMessage = {
      _id: getMessageId(),
      text: botResponse,
      createdAt: new Date(),
      user: CHAT_BOT
    }

    const finalMessages = GiftedChat.append(updatedMessages, [botMessage]);
    setMessages(finalMessages);
    await saveChatHistory(finalMessages)
  };

  function getMessageId(): string {
    return uuidv4()
  }

  useEffect(() => {
    const sendImageWithPrompt = async () => {
      if (normalizedUri) {
        const imageMessage: IMessage = {
          _id: getMessageId(),
          createdAt: new Date(),
          user: { _id: 1, name: "User" },
          image: normalizedUri,
          text: "Me fale sobre esta imagem",
        };

        // Exibe a mensagem da imagem no chat
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [imageMessage])
        );

        // Chama a IA com a imagem e o texto
        const botResponse = (await generateAIContent(
          imageMessage.text,
          normalizedUri
        )) || "Desculpe, não consegui processar sua solicitação.";

        // Exibe a resposta da IA
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [
            {
              _id: getMessageId(),
              text: botResponse,
              createdAt: new Date(),
              user: CHAT_BOT,
            },
          ])
        );
        router.replace('/');
      }
    };

    sendImageWithPrompt();
  }, [normalizedUri]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{'Carregando...'}</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={user}
        placeholder="Mensagem"
        renderActions={(props: ActionsProps) => CameraButton(props)}
        renderBubble={RenderBubble}
      />
      <Button
        title="Apaga histórico"
        onPress={async () => {
          const history = await clearChatHistory();
          console.log("Histórico excluído com sucesso");
        }}
      />
    </View>
  );
}
