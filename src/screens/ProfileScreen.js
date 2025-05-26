import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

const SettingItem = ({ icon, title, hasArrow = true, isToggle = false, value = false, onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
        <View style={styles.settingLeft}>
            <MaterialIcons name={icon} size={24} color={colors.primary} />
            <Text style={styles.settingText}>{title}</Text>
        </View>
        {hasArrow && <MaterialIcons name="chevron-right" size={24} color={colors.gray} />}
        {isToggle && (
            <View style={[styles.toggleContainer, value && styles.toggleActive]}>
                <View style={[styles.toggleCircle, value && styles.toggleCircleActive]} />
            </View>
        )}
    </TouchableOpacity>
);

export default function ProfileScreen() {
    const [darkMode, setDarkMode] = React.useState(false);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={{ uri: 'https://placekitten.com/200/200' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.editButton}>
                        <MaterialIcons name="edit" size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>Gabrieli Nadaleti</Text>
                <Text style={styles.email}>gabinkbk@hotmail.com</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Configurações gerais</Text>
                <SettingItem
                    icon="dark-mode"
                    title="Modo"
                    hasArrow={false}
                    isToggle={true}
                    value={darkMode}
                    onPress={() => setDarkMode(!darkMode)}
                />
                <SettingItem icon="lock" title="Mudar senha" />
                <SettingItem icon="translate" title="Idioma" />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações</Text>
                <SettingItem icon="phone-android" title="Sobre o aplicativo" />
                <SettingItem icon="description" title="Termos e condições" />
                <SettingItem icon="security" title="Política de privacidade" />
                <SettingItem icon="share" title="Compartilhe esse app" />
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
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 30,
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: colors.white,
    },
    editButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.white,
    },
    name: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        color: colors.white,
        opacity: 0.8,
        fontSize: 16,
    },
    section: {
        padding: 15,
        backgroundColor: colors.white,
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 16,
        color: colors.gray,
        marginBottom: 15,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        marginLeft: 15,
        fontSize: 16,
        color: colors.text,
    },
    toggleContainer: {
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.lightGray,
        padding: 2,
    },
    toggleActive: {
        backgroundColor: colors.primary,
    },
    toggleCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: colors.white,
    },
    toggleCircleActive: {
        transform: [{ translateX: 20 }],
    },
}); 