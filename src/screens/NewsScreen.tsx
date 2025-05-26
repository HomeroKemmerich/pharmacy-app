import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    Alert,
    Linking,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useNews } from '../hooks/useNews';
import { colors } from '../theme/colors';

export const NewsScreen: React.FC = () => {
    const { loading, error, news, refreshNews } = useNews();

    const handleNewsPress = async (link?: string) => {
        if (!link) return;

        try {
            const canOpen = await Linking.canOpenURL(link);
            if (canOpen) {
                await Linking.openURL(link);
            } else {
                Alert.alert('Erro', 'Não foi possível abrir o link da notícia');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível abrir o link da notícia');
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refreshNews}>
                    <Text style={styles.retryText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refreshNews} />
            }
        >
            {news.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.newsCard}
                    onPress={() => handleNewsPress(item.link)}
                    activeOpacity={0.7}
                >
                    <View style={styles.newsContent}>
                        <View style={styles.headerRow}>
                            <Text style={styles.category}>{item.category}</Text>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={20}
                                color={colors.primary}
                            />
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                        {item.date && <Text style={styles.date}>{item.date}</Text>}
                        {item.description && (
                            <Text style={styles.description}>{item.description}</Text>
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    newsCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    newsContent: {
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    category: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: '600',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    errorText: {
        color: colors.error,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 