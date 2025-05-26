import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

const CategoryItem = ({ title, isEven }) => (
    <TouchableOpacity style={[styles.categoryItem, { backgroundColor: isEven ? colors.lightGreen : colors.primary }]}>
        <Text style={[styles.categoryText, { color: isEven ? colors.primary : colors.white }]}>{title}</Text>
    </TouchableOpacity>
);

const categories = [
    'Adrenérgicos',
    'Agentes antineoplásicos',
    'Agentes antiplaquetários',
    'Agentes antitrombóticos',
    'Agentes antivirais',
    'Analgésicos',
    'Anestésicos',
    'Ansiolíticos',
    'Antibióticos',
    'Anticoagulantes',
    'Anticoncepcionais',
    'Anticonvulsivantes',
];

export default function BularioScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bulário</Text>
                <Text style={styles.subtitle}>
                    Tire suas dúvidas sobre medicamentos com nosso bulário!
                </Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisa"
                    placeholderTextColor={colors.gray}
                />
                <MaterialIcons name="search" size={24} color={colors.primary} style={styles.searchIcon} />
            </View>

            <View style={styles.categoriesSection}>
                <Text style={styles.sectionTitle}>Classes farmacológicas</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {categories.map((category, index) => (
                        <CategoryItem
                            key={category}
                            title={category}
                            isEven={index % 2 === 0}
                        />
                    ))}
                </ScrollView>
            </View>

            <Text style={styles.footerText}>Farmác.IA</Text>
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
    searchContainer: {
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        borderRadius: 8,
        padding: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
    searchIcon: {
        marginLeft: 10,
    },
    categoriesSection: {
        flex: 1,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 15,
    },
    categoryItem: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '500',
    },
    footerText: {
        textAlign: 'center',
        padding: 15,
        color: colors.primary,
        fontStyle: 'italic',
    },
}); 