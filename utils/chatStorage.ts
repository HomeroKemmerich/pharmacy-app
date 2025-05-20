// utils/chatStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMessage } from 'react-native-gifted-chat';

const CHAT_HISTORY_KEY = 'chat-history';

export async function saveChatHistory(messages: IMessage[]) {
    try {
        const json = JSON.stringify(messages);
        await AsyncStorage.setItem(CHAT_HISTORY_KEY, json);
    } catch (e) {
        console.error('Erro ao salvar histórico:', e);
    }
}

export async function loadChatHistory(): Promise<IMessage[]> {
    try {
        const json = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
        return json ? JSON.parse(json) : [];
    } catch (e) {
        console.error('Erro ao carregar histórico:', e);
        return [];
    }
}

export async function clearChatHistory() {
    try {
        await AsyncStorage.removeItem(CHAT_HISTORY_KEY);
    } catch (e) {
        console.error('Erro ao apagar histórico');
        return false;
    }
}
