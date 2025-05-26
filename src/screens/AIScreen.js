import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { colors } from '../theme/colors';

const Message = ({ text, isUser }) => (
    <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.aiMessage]}>
        {!isUser && (
            <View style={styles.aiIcon}>
                <Text style={styles.aiIconText}>S</Text>
            </View>
        )}
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
            <Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>{text}</Text>
        </View>
    </View>
);

export default function AIScreen() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { text: 'Olá! Como posso te ajudar?', isUser: false },
        { text: 'Posologia da dipirona 1g em comprimidos para adulto', isUser: true },
        {
            text: 'Dipirona 1g para adultos: tomar 1 comprimido, até 4 vezes ao dia, com intervalo de 6 a 8 horas. Início de ação: 30 a 60 minutos. Os comprimidos devem ser ingeridos por via oral, com aproximadamente ½ a 1 copo de líquido. Não mastigar. Consulte um médico se os sintomas persistirem.',
            isUser: false,
        },
    ]);

    const handleSend = () => {
        if (message.trim()) {
            setMessages([...messages, { text: message, isUser: true }]);
            setMessage('');
            // Here you would typically make an API call to get the AI response
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Inteligência Artificial</Text>
                <Text style={styles.subtitle}>
                    Tire suas dúvidas sobre posologia, interações e classes farmacológicas!
                </Text>
            </View>

            <ScrollView style={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} isUser={msg.isUser} />
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.cameraButton}>
                    <MaterialIcons name="camera-alt" size={24} color={colors.primary} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Escreva sua mensagem..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <MaterialIcons name="send" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.primary,
        padding: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: colors.white,
        opacity: 0.9,
    },
    messagesContainer: {
        flex: 1,
        padding: 15,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'flex-end',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    aiMessage: {
        justifyContent: 'flex-start',
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 20,
    },
    userBubble: {
        backgroundColor: colors.primary,
        borderBottomRightRadius: 5,
    },
    aiBubble: {
        backgroundColor: colors.lightGreen,
        borderBottomLeftRadius: 5,
    },
    messageText: {
        fontSize: 16,
    },
    userText: {
        color: colors.white,
    },
    aiText: {
        color: colors.text,
    },
    aiIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    aiIconText: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.lightGray,
        backgroundColor: colors.white,
    },
    input: {
        flex: 1,
        backgroundColor: colors.lightGray,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 10,
        fontSize: 16,
        maxHeight: 100,
    },
    cameraButton: {
        padding: 5,
    },
    sendButton: {
        padding: 5,
    },
}); 