import { Image } from "expo-image"
import { Bubble } from "react-native-gifted-chat"

export const RenderBubble = (props: any) => {
    return (
        <Bubble {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#CFE1CF'
                },
                left: {
                    backgroundColor: '#4F6F52'
                }
            }}
            textStyle={{
                left: {
                    color: '#FFFFFF'
                },
                right: {
                    color: '#0000000'
                }
            }}
        />
    )
}