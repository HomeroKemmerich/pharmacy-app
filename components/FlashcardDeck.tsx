import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { FlashcardDeck as FlashcardDeckType, Flashcard as FlashcardType } from '../types/flashcard';
import { Flashcard } from './Flashcard';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface FlashcardDeckProps {
    deck: FlashcardDeckType;
    onCardComplete?: (cardId: string, difficulty: FlashcardType['difficulty']) => void;
}

export function FlashcardDeck({ deck, onCardComplete }: FlashcardDeckProps) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [completedCards, setCompletedCards] = useState<string[]>([]);

    const handleDifficultySelect = (difficulty: FlashcardType['difficulty']) => {
        const currentCard = deck.cards[currentCardIndex];
        onCardComplete?.(currentCard.id, difficulty);
        setCompletedCards([...completedCards, currentCard.id]);

        if (currentCardIndex < deck.cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    if (completedCards.length === deck.cards.length) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={styles.completeText}>
                    Deck Complete! 🎉
                </ThemedText>
                <ThemedText>
                    You've reviewed all {deck.cards.length} cards.
                </ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.progress}>
                Card {currentCardIndex + 1} of {deck.cards.length}
            </ThemedText>
            <View style={styles.cardContainer}>
                <Flashcard
                    card={deck.cards[currentCardIndex]}
                    onDifficultySelect={handleDifficultySelect}
                />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    progress: {
        fontSize: 18,
        marginBottom: 20,
    },
    completeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
}); 