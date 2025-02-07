import { User } from "@/types/user";
import { useState } from "react";
import { View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { aiModel, generateAIContent } from '../datasources/gemini';

export default function Index() {
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

  const handleSend = (newMessages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0].text;
    const botResponse = generateChatbotResponse(userMessage);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Math.round(Math.random() * 1000000),
          text: botResponse,
          createdAt: new Date(),
          user: { _id: 2, name: "Chatbot" },
        },
      ])
    );
  };

  const generateChatbotResponse = async (prompt: any) => {
    return await generateAIContent(prompt);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(newMessages: IMessage[]) => handleSend(newMessages)}
        user={{ _id: 1, name: "User" }} />
    </View>
  );
}
