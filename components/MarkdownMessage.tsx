import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface MarkdownMessageProps {
    content: string;
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const styles = StyleSheet.create({
        body: {
            color: isDark ? '#FFFFFF' : '#000000',
            fontSize: 16,
        },
        heading1: {
            color: isDark ? '#FFFFFF' : '#000000',
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 12,
        },
        heading2: {
            color: isDark ? '#FFFFFF' : '#000000',
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 10,
        },
        link: {
            color: '#2196F3',
        },
        blockquote: {
            borderLeftColor: '#2196F3',
            borderLeftWidth: 4,
            paddingLeft: 12,
            marginLeft: 0,
            marginVertical: 8,
        },
        code_inline: {
            backgroundColor: isDark ? '#333333' : '#F5F5F5',
            padding: 4,
            borderRadius: 4,
            fontFamily: 'monospace',
        },
        code_block: {
            backgroundColor: isDark ? '#333333' : '#F5F5F5',
            padding: 8,
            borderRadius: 4,
            marginVertical: 8,
            fontFamily: 'monospace',
        },
        list_item: {
            marginVertical: 4,
        },
    });

    return (
        <Markdown style={styles}>
            {content}
        </Markdown>
    );
} 