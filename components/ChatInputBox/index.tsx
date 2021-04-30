// import moment from 'moment';
import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
// import {Message} from '../../types'
// import styles from './styles';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations'




const ChatInputBox = (props) => {

    const { chatRoomID } = props

    const [message, setMessage] = useState<string>("");
    const [myUserId, setMyUserId] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub)
        }
        fetchUser()
    }, [])



    const onMicrophonePress = () => {
        console.warn('Microphone')
    }

    const updateChatRoomLastMessage = async (messageId: string) => {
        try {
            await API.graphql(
                graphqlOperation(
                    updateChatRoom, {
                    input: {
                        id: chatRoomID,
                        lastMessageID: messageId,

                    }
                }
                )
            )

        } catch (e) {
            console.log(e)
        }
    }


    const onSendPress = async () => {
        try {
            const newMessageData = await API.graphql(
                graphqlOperation(
                    createMessage, {
                    input: {
                        content: message,
                        userID: myUserId,
                        chatRoomID: chatRoomID
                    }
                }
                )
            )

            //   console.log('newMessageData')
            //   console.log(newMessageData)
            await updateChatRoomLastMessage(newMessageData.data.createMessage.id)

        } catch (e) {
            console.log(e)
        }
        // Send the message to backend

        setMessage('')
    }

    const onPress = () => {
        if (!message) {
            onMicrophonePress();
        } else {
            onSendPress();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <TouchableOpacity>
                    <FontAwesome5 name='laugh-beam' size={24} color="grey" />
                </TouchableOpacity>

                <TextInput
                    placeholder="Type a message"
                    multiline
                    // numberOfLines = {5}
                    onChangeText={setMessage}
                    value={message}
                    style={styles.textInput}
                />

                <TouchableOpacity >
                    <Entypo name='attachment' size={24} color="grey" style={styles.icon} />
                </TouchableOpacity>


                <TouchableOpacity >
                    {
                        !message && <Fontisto name='camera' size={24} color="grey" style={styles.icon} />
                    }
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => onPress()}>
                <View style={styles.buttonContainer}>

                    {
                        !message ?
                            <MaterialCommunityIcons name='microphone' size={28} color="white" /> :
                            <MaterialIcons name='send' size={28} color="white" />
                    }

                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ChatInputBox