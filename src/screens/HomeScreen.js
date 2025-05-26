import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

const NewsCard = ({ title, image, description }) => (
    <TouchableOpacity style={styles.newsCard}>
        <Image source={{ uri: image }} style={styles.newsImage} />
        <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{title}</Text>
            <Text style={styles.newsDescription} numberOfLines={2}>
                {description}
            </Text>
        </View>
    </TouchableOpacity>
);

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'https://placekitten.com/100/100' }}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.welcomeText}>Bem vinda,</Text>
                        <Text style={styles.userName}>Gabrieli</Text>
                    </View>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar"
                    placeholderTextColor={colors.gray}
                />
                <MaterialIcons name="search" size={24} color={colors.primary} style={styles.searchIcon} />
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Conselho Federal de Farmácia</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeMoreText}>Mais...</Text>
                    </TouchableOpacity>
                </View>

                <NewsCard
                    title="Medicamentos que modulam GLP-1 alteram preferências alimentares, aponta estudo"
                    image="https://example.com/news1.jpg"
                    description="Novo estudo revela impactos importantes sobre medicamentos GLP-1"
                />

                <NewsCard
                    title="94% dos medicamentos genéricos vendidos no Brasil são produzidos por farmacêuticas nacionais"
                    image="https://example.com/news2.jpg"
                    description="Dados mostram forte presença da indústria nacional no mercado de genéricos"
                />
            </View>
        </ScrollView>
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
        paddingTop: 40,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    welcomeText: {
        color: colors.white,
        fontSize: 16,
    },
    userName: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
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
    section: {
        padding: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    seeMoreText: {
        color: colors.primary,
    },
    newsCard: {
        backgroundColor: colors.white,
        borderRadius: 8,
        marginBottom: 15,
        elevation: 2,
        overflow: 'hidden',
    },
    newsImage: {
        width: '100%',
        height: 150,
    },
    newsContent: {
        padding: 15,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 5,
    },
    newsDescription: {
        fontSize: 14,
        color: colors.gray,
    },
}); 