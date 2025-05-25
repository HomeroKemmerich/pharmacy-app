import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { FlashcardDeck } from '../components/FlashcardDeck';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import type { Flashcard, FlashcardDeck as FlashcardDeckType } from '../types/flashcard';

// Sample data - in a real app, this would come from a database or API
const sampleDecks: FlashcardDeckType[] = [
    {
        id: '1',
        name: 'Common Medications',
        description: 'Learn about frequently prescribed medications',
        createdAt: new Date(),
        updatedAt: new Date(),
        cards: [
            {
                id: '1',
                front: 'Acetaminophen',
                back: 'Pain reliever and fever reducer. Brand names include Tylenol.',
                category: 'OTC Medications',
            },
            {
                id: '2',
                front: 'Amoxicillin',
                back: 'Antibiotic used to treat bacterial infections.',
                category: 'Antibiotics',
            },
            {
                id: '3',
                front: 'Lisinopril',
                back: 'ACE inhibitor used to treat high blood pressure and heart failure.',
                category: 'Cardiovascular',
            },
        ],
    },
    {
        id: '2',
        name: 'Medical Terminology',
        description: 'Essential medical terms for pharmacy practice',
        createdAt: new Date(),
        updatedAt: new Date(),
        cards: [
            {
                id: '4',
                front: 'Hypertension',
                back: 'High blood pressure',
                category: 'Medical Terms',
            },
            {
                id: '5',
                front: 'Dysphagia',
                back: 'Difficulty swallowing',
                category: 'Medical Terms',
            },
        ],
    },
];

export default function FlashcardsScreen() {
    const [selectedDeck, setSelectedDeck] = useState<FlashcardDeckType | null>(null);

    const handleCardComplete = (cardId: string, difficulty: Flashcard['difficulty']) => {
        // In a real app, you would save the progress to a database
        console.log(`Card ${cardId} completed with difficulty: ${difficulty}`);
    };

    if (selectedDeck) {
        return (
            <ThemedView style={styles.container}>
                <Stack.Screen
                    options={{
                        title: selectedDeck.name,
                        headerBackTitle: 'Decks',
                    }}
                />
                <FlashcardDeck
                    deck={selectedDeck}
                    onCardComplete={handleCardComplete}
                />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Flashcards',
                }}
            />
            <ScrollView style={styles.scrollView}>
                {sampleDecks.map((deck) => (
                    <Pressable
                        key={deck.id}
                        style={styles.deckCard}
                        onPress={() => setSelectedDeck(deck)}
                    >
                        <ThemedText style={styles.deckTitle}>{deck.name}</ThemedText>
                        <ThemedText style={styles.deckDescription}>
                            {deck.description}
                        </ThemedText>
                        <ThemedText style={styles.cardCount}>
                            {deck.cards.length} cards
                        </ThemedText>
                    </Pressable>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    deckCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
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
    deckTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    deckDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    cardCount: {
        fontSize: 14,
        color: '#888',
    },
}); 