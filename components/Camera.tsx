import styles from "@/constants/styles";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import React, { forwardRef } from "react";
import { Pressable, View } from "react-native";

interface RenderCameraProps {
    takePicture: () => void;
}

const Camera = forwardRef<CameraView, RenderCameraProps>(({ takePicture }, ref) => {
    return (
        <CameraView
            style={styles.camera}
            ref={ref}
            mute={false}
            responsiveOrientationWhenOrientationLocked
        >
            <View style={styles.shutterContainer}>
                <Pressable>
                    <AntDesign name="picture" size={32} color="white" />
                </Pressable>
                <Pressable onPress={takePicture}>
                    {({ pressed }) => (
                        <View
                            style={[
                                styles.shutterBtn,
                                {
                                    opacity: pressed ? 0.5 : 1,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.shutterBtnInner,
                                    {
                                        backgroundColor: 'white'
                                    },
                                ]}
                            />
                        </View>
                    )}
                </Pressable>
                <View>
                    <FontAwesome6 name="rotate-left" size={32} color="transparent" />
                </View>
            </View>
        </CameraView>
    );
});

export default Camera;