import { Image } from 'expo-image';
import React from 'react';
import { Linking, Pressable, StyleSheet } from 'react-native';
import type { NewsItem } from '../types/news';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface NewsCardProps {
    item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
    const handlePress = async () => {
        if (await Linking.canOpenURL(item.url)) {
            await Linking.openURL(item.url);
        }
    };

    return (
        <Pressable onPress={handlePress} style={styles.container}>
            {item.imageUrl && (
                <Image
                    source={item.imageUrl}
                    style={styles.image}
                    contentFit="cover"
                />
            )}
            <ThemedView style={styles.content}>
                <ThemedText style={styles.category}>
                    {item.category}
                </ThemedText>
                <ThemedText style={styles.title}>
                    {item.title}
                </ThemedText>
                {item.summary && (
                    <ThemedText style={styles.summary} numberOfLines={2}>
                        {item.summary}
                    </ThemedText>
                )}
                <ThemedText style={styles.date}>
                    {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                </ThemedText>
            </ThemedView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 16,
    },
    category: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    summary: {
        fontSize: 16,
        color: '#444',
        marginBottom: 8,
        lineHeight: 22,
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
}); 