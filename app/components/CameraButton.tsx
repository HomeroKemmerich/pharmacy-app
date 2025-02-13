import { FontAwesome } from "@expo/vector-icons"
import { View } from "react-native"
import { ActionsProps } from "react-native-gifted-chat"

export const CameraButton = (props: ActionsProps) => {
    return (
        <View
            style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'red',
                height: '100%',
                padding: 8,
                backgroundColor: '#019EF3',
                borderRadius: 12,
            }}>
            <FontAwesome name="camera" size={32} color={'white'} />
        </View>
    )
}