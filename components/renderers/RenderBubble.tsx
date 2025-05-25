import { MarkdownMessage } from '@/components/MarkdownMessage';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Bubble, IMessage } from 'react-native-gifted-chat';

export function RenderBubble(props: any) {
    const { currentMessage } = props;

    if (currentMessage?.image) {
        return (
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: currentMessage.image }}
                    style={styles.image}
                    contentFit="cover"
                    transition={200}
                />
            </View>
        );
    }

    return (
        <Bubble
            {...props}
            wrapperStyle={{
                left: styles.bubbleLeft,
                right: styles.bubbleRight,
            }}
            renderMessageText={() => (
                <View style={[
                    styles.messageContainer,
                    props.position === 'left' ? styles.messageLeft : styles.messageRight
                ]}>
                    <MarkdownMessage content={currentMessage.text} />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 15,
        padding: 2,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 13,
    },
    bubbleLeft: {
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        marginBottom: 5,
    },
    bubbleRight: {
        backgroundColor: '#2196F3',
        borderRadius: 15,
        marginBottom: 5,
    },
    messageContainer: {
        padding: 10,
        borderRadius: 15,
    },
    messageLeft: {
        backgroundColor: '#f0f0f0',
    },
    messageRight: {
        backgroundColor: '#2196F3',
    },
});