import * as FileSystem from 'expo-file-system';
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { Button, Text, View } from "react-native";

export default function PreviewScreen() {
    const [imageUri, setImageUri] = useState<string>();
    const { uri } = useLocalSearchParams();
    const router = useRouter();

    const normalizedUri = Array.isArray(uri) ? uri[0] : uri;

    if (!normalizedUri) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>Erro: Imagem não encontrada</Text>
                <Button title="Voltar" onPress={() => router.back()} />
            </View>
        );
    }

    useEffect(() => {
        setImageUri(normalizedUri);
    }, [normalizedUri]);

    if (!imageUri) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Carregando imagem...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="contain"
                />
            </View>

            <View
                style={{
                    padding: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor: '#f0f0f0',
                }}
            >
                <Button
                    title="Cancelar"
                    color="red"
                    onPress={() => router.push("/")}
                />
                <Button
                    title="Confirmar"
                    onPress={() => {
                        router.push({
                            pathname: "/",
                            params: { uri: imageUri },
                        });
                    }}
                />
            </View>
        </View>
    );
}
