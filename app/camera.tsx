import Camera from "@/components/Camera";
import {
    CameraView,
    useCameraPermissions,
} from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Button, Text, View } from "react-native";
import styles from "../constants/styles";

export default function CameraScreen() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    É necessário autorizar o uso da câmera
                </Text>
                <Button onPress={requestPermission} title="Autorizar" />
            </View>
        );
    }

    const takePicture = async () => {
        const photo = await ref.current?.takePictureAsync();

        // Cria um asset para que a imagem seja armazenada
        const asset = await MediaLibrary.createAssetAsync(photo!.uri);

        router.push({ pathname: '/preview', params: { uri: asset.uri } });
    };

    return (
        <View style={styles.container}>
            <Camera ref={ref} takePicture={takePicture} />
        </View>
    );
}