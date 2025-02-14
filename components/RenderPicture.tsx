import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Button, View } from "react-native";

const RenderPicture = (uri: string) => {

    const handleCancel = () => {
    }

    const handleConfirm = () => {

    }

    return (
        <View style={{
            flex: 1,
            width: '100%'
        }}>
            <Image
                source={{ uri }}
                contentFit="contain"
                style={{ width: '100%', aspectRatio: 1 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button title="Cancelar" color={'red'} onPress={handleCancel} />
                <Button title="Confirmar" onPress={handleConfirm} />
            </View>
        </View>
    );
};

export default RenderPicture;