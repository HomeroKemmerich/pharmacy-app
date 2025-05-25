import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import type { Flashcard as FlashcardType } from '../types/flashcard';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface FlashcardProps {
    card: FlashcardType;
    onDifficultySelect?: (difficulty: FlashcardType['difficulty']) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

export function Flashcard({ card, onDifficultySelect }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const rotation = useSharedValue(0);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateY: `${interpolate(rotation.value, [0, 1], [0, 180])}deg`,
                },
            ],
            backfaceVisibility: 'hidden',
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateY: `${interpolate(rotation.value, [0, 1], [180, 360])}deg`,
                },
            ],
            backfaceVisibility: 'hidden',
        };
    });

    const handleFlip = () => {
        const newValue = isFlipped ? 0 : 1;
        rotation.value = withTiming(newValue, { duration: 300 });
        setIsFlipped(!isFlipped);
    };

    return (
        <ThemedView style={styles.container}>
            <Pressable onPress={handleFlip} style={styles.cardContainer}>
                <Animated.View style={[styles.card, frontAnimatedStyle]}>
                    <ThemedText style={styles.text}>{card.front}</ThemedText>
                </Animated.View>
                <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
                    <ThemedText style={styles.text}>{card.back}</ThemedText>
                    {isFlipped && onDifficultySelect && (
                        <ThemedView style={styles.difficultyContainer}>
                            <Pressable
                                style={[styles.difficultyButton, styles.easyButton]}
                                onPress={() => onDifficultySelect('easy')}
                            >
                                <ThemedText>Easy</ThemedText>
                            </Pressable>
                            <Pressable
                                style={[styles.difficultyButton, styles.mediumButton]}
                                onPress={() => onDifficultySelect('medium')}
                            >
                                <ThemedText>Medium</ThemedText>
                            </Pressable>
                            <Pressable
                                style={[styles.difficultyButton, styles.hardButton]}
                                onPress={() => onDifficultySelect('hard')}
                            >
                                <ThemedText>Hard</ThemedText>
                            </Pressable>
                        </ThemedView>
                    )}
                </Animated.View>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
    },
    card: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBack: {
        backgroundColor: '#f8f9fa',
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
    },
    difficultyContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 10,
    },
    difficultyButton: {
        padding: 10,
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
    },
    easyButton: {
        backgroundColor: '#a8e6cf',
    },
    mediumButton: {
        backgroundColor: '#ffd3b6',
    },
    hardButton: {
        backgroundColor: '#ffaaa5',
    },
}); 