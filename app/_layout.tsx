import { Stack } from "expo-router";
import { createContext } from "react";

export const AuthContext = createContext({ name: '' });

export default function RootLayout() {
  return (
    <AuthContext.Provider value={{
      name: 'Homero'
    }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
        <Stack.Screen name="preview" options={{ headerShown: false }} />
      </Stack>
    </AuthContext.Provider >
  );
}
