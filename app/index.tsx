import { RenderBubble } from "@/components/renderers/RenderBubble";
import { User } from "@/types/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { ActionsProps, Bubble, GiftedChat, IMessage } from "react-native-gifted-chat";
import { CameraButton } from "../components/CameraButton";
import { generateAIContent } from '../datasources/gemini';

export default function Index() {
  const { uri } = useLocalSearchParams();
  const router = useRouter();

  const normalizedUri = Array.isArray(uri) ? uri[0] : uri;

  const [user, setUser] = useState<User>({
    id: 0,
    name: 'Homero'
  })
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: `Olá ${user.name}! Como posso te ajudar?`,
      createdAt: new Date(),
      user: { _id: 2, name: "Chatbot" },
    },
  ]);

  const onSend = async (newMessages: IMessage[]) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    console.log('Message sent');

    const userMessage = newMessages[0].text;

    console.log('Before AI request')
    const botResponse = await generateAIContent(userMessage, normalizedUri);
    console.log('After AI request')

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [
        {
          _id: Math.round(Math.random() * 1000000),
          text: botResponse,
          createdAt: new Date(),
          user: { _id: 2, name: "Chatbot" },
        },
      ])
    );
    console.log('Message received');
  };

  useEffect(() => {
    const sendImageWithPrompt = async () => {
      if (normalizedUri) {
        const imageMessage: IMessage = {
          _id: Math.random(),
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
        const botResponse = await generateAIContent(
          imageMessage.text,
          normalizedUri
        );

        // Exibe a resposta da IA
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.random(),
              text: botResponse,
              createdAt: new Date(),
              user: { _id: 2, name: "Chatbot" },
            },
          ])
        );
        router.replace('/');
      }
    };

    sendImageWithPrompt();
  }, [normalizedUri]);


  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages: IMessage[]) => onSend(newMessages)}
        user={{ _id: 1, name: "User" }}
        placeholder="Mensagem"
        renderActions={(props: ActionsProps) => CameraButton(props)}
        renderBubble={RenderBubble}
      />
    </View>
  );
}
