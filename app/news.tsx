import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { NewsCard } from '../components/NewsCard';
import { ThemedView } from '../components/ThemedView';
import type { NewsItem } from '../types/news';

// Sample data based on CFF website news
const sampleNews: NewsItem[] = [
    {
        id: '1',
        title: 'Descoberta de proteína pode revolucionar tratamentos contra queda de cabelo',
        category: 'Notícias Gerais',
        publishedAt: new Date(),
        url: 'https://site.cff.org.br/',
    },
    {
        id: '2',
        title: 'Levantamento inédito revela que o Brasil tem 2,4 milhões de pessoas diagnosticadas com autismo',
        category: 'Notícias Gerais',
        publishedAt: new Date(),
        url: 'https://site.cff.org.br/',
    },
    {
        id: '3',
        title: '94% dos medicamentos genéricos vendidos no Brasil são produzidos por farmacêuticas nacionais',
        category: 'Notícias Gerais',
        publishedAt: new Date(),
        url: 'https://site.cff.org.br/',
    },
    {
        id: '4',
        title: 'Medicamentos que modulam GLP-1 alteram preferências alimentares, aponta estudo',
        category: 'Notícias Gerais',
        publishedAt: new Date(),
        url: 'https://site.cff.org.br/',
    },
    {
        id: '5',
        title: 'Composto de esponja marinha tem potencial para eliminar parasita da malária',
        category: 'Notícias Gerais',
        publishedAt: new Date(),
        url: 'https://site.cff.org.br/',
    },
    {
        id: '6',
        title: 'Influenza A supera Covid e lidera mortes em idosos por síndrome respiratória grave no país',
        category: 'Notícias Gerais',
        publishedAt: new Date(),
        url: 'https://site.cff.org.br/',
    },
];

export default function NewsScreen() {
    const [news, setNews] = useState<NewsItem[]>(sampleNews);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // In a real app, this would fetch new data from the CFF website
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <ThemedView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Notícias CFF',
                    headerLargeTitle: true,
                }}
            />
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {news.map((item) => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
}); 