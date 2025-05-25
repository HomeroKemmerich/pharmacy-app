import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { createContext } from "react";

export const AuthContext = createContext({ name: '' });

export default function RootLayout() {
  return (
    <AuthContext.Provider value={{
      name: 'Homero'
    }}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="flashcards"
          options={{
            title: "Flashcards",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="card" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: "Notícias",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="newspaper" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: "Camera",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="preview"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </AuthContext.Provider>
  );
}
