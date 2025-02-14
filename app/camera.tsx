import RenderCamera from "@/components/RenderCamera";
import RenderPicture from "@/components/RenderPicture";
import {
    CameraView,
    useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Text, View } from "react-native";
import styles from "../constants/styles";

export default function Camera() {
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
        setUri(photo?.uri);
    };

    return (
        <View style={styles.container}>
            {/*TODO: Return compopnents, not functions */}
            {uri ? RenderPicture(uri) : RenderCamera(ref, takePicture)}
        </View>
    );
}
