import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

const AnswerOption = ({ text, isSelected, onSelect, isCorrect, showAnswer }) => {
    const getBackgroundColor = () => {
        if (!showAnswer) return isSelected ? colors.primary : colors.lightGreen;
        if (isCorrect) return '#4CAF50';
        return isSelected ? '#F44336' : colors.lightGreen;
    };

    return (
        <TouchableOpacity
            style={[
                styles.answerOption,
                { backgroundColor: getBackgroundColor() },
            ]}
            onPress={onSelect}
            disabled={showAnswer}
        >
            <Text
                style={[
                    styles.answerText,
                    { color: isSelected || (showAnswer && isCorrect) ? colors.white : colors.primary },
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default function FlashcardsScreen() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleAnswerSelect = (answer) => {
        if (!showAnswer) {
            setSelectedAnswer(answer);
        }
    };

    const handleCheckAnswer = () => {
        setShowAnswer(true);
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setShowAnswer(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Flashcards</Text>
                <Text style={styles.subtitle}>
                    Treine seus conhecimentos sobre classes farmacológicas, interações medicamentosas e muito mais!
                </Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.categoryHeader}>
                    <Text style={styles.categoryTitle}>Alzheimer</Text>
                </View>

                <View style={styles.questionCard}>
                    <Text style={styles.questionText}>
                        A memantina, indicada na doença de Alzheimer moderada a grave, é um medicamento cujo principal mecanismo é agir como:
                    </Text>

                    <View style={styles.answerOptions}>
                        <AnswerOption
                            text="A) modulador dos canais de cálcio."
                            isSelected={selectedAnswer === 'A'}
                            onSelect={() => handleAnswerSelect('A')}
                            isCorrect={false}
                            showAnswer={showAnswer}
                        />
                        <AnswerOption
                            text="B) modulador dos receptores colinérgicos nicotínicos."
                            isSelected={selectedAnswer === 'B'}
                            onSelect={() => handleAnswerSelect('B')}
                            isCorrect={false}
                            showAnswer={showAnswer}
                        />
                        <AnswerOption
                            text="C) agonista muscarínico."
                            isSelected={selectedAnswer === 'C'}
                            onSelect={() => handleAnswerSelect('C')}
                            isCorrect={false}
                            showAnswer={showAnswer}
                        />
                        <AnswerOption
                            text="D) antagonista dos receptores de glutamato."
                            isSelected={selectedAnswer === 'D'}
                            onSelect={() => handleAnswerSelect('D')}
                            isCorrect={true}
                            showAnswer={showAnswer}
                        />
                        <AnswerOption
                            text="E) inibidor da butiril colinesterase."
                            isSelected={selectedAnswer === 'E'}
                            onSelect={() => handleAnswerSelect('E')}
                            isCorrect={false}
                            showAnswer={showAnswer}
                        />
                    </View>

                    {selectedAnswer && !showAnswer && (
                        <TouchableOpacity style={styles.checkButton} onPress={handleCheckAnswer}>
                            <Text style={styles.checkButtonText}>Verificar resposta</Text>
                        </TouchableOpacity>
                    )}

                    {showAnswer && (
                        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                            <Text style={styles.nextButtonText}>Próxima questão</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
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
    content: {
        flex: 1,
        padding: 15,
    },
    categoryHeader: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    categoryTitle: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    questionCard: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 20,
        elevation: 2,
    },
    questionText: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 20,
        lineHeight: 24,
    },
    answerOptions: {
        gap: 10,
    },
    answerOption: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    answerText: {
        fontSize: 16,
    },
    checkButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    checkButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: colors.secondary,
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    nextButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 