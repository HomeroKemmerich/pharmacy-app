import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { colors } from './src/theme/colors';

// Screens
import AIScreen from './src/screens/AIScreen';
import BularioScreen from './src/screens/BularioScreen';
import FlashcardsScreen from './src/screens/FlashcardsScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.gray,
                    tabBarStyle: {
                        backgroundColor: colors.white,
                        borderTopWidth: 1,
                        borderTopColor: colors.lightGray,
                    },
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTintColor: colors.white,
                }}
            >
                <Tab.Screen
                    name="Bulário"
                    component={BularioScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="pill" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Câmera"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="camera" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="IA"
                    component={AIScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="robot" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Flashcards"
                    component={FlashcardsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cards" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Perfil"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
} 