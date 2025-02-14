import { FontAwesome } from "@expo/vector-icons"
import { Link } from "expo-router"
import { navigate } from "expo-router/build/global-state/routing"
import { View } from "react-native"
import { ActionsProps } from "react-native-gifted-chat"

export const CameraButton = (props: ActionsProps) => {
    return (
        <View
            style={{
                height: '100%',
                padding: 8,
                backgroundColor: '#019EF3',
                borderRadius: 12,
            }}>
            <Link href={'/camera'}>
                <FontAwesome name="camera" size={32} color={'white'}></FontAwesome>
            </Link>
        </View>
    )
}