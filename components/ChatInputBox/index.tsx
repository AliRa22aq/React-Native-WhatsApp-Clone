// import moment from 'moment';
import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
// import {Message} from '../../types'
// import styles from './styles';

const ChatInputBox = () => {

    const [message, setMessage] = useState<string>("");
    // console.log(message)

    const onMicrophonePress= () => {
        console.warn('Microphone')
    }

    const onSendPress= () => {
        console.warn(`Sending: ${message}`)

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
            <FontAwesome5 name='laugh-beam' size={24} color="grey" />
            <TextInput 
                placeholder="Type a message"
                multiline
                // numberOfLines = {5}
                onChangeText={setMessage}
                value={message}
                style={styles.textInput}
                />
            <Entypo name='attachment' size={24} color="grey" style={styles.icon}/>

            {
                !message && <Fontisto name='camera' size={24} color="grey" style={styles.icon} />

            }
            </View>

                <TouchableOpacity onPress={()=> onPress()}> 
                <View style={styles.buttonContainer}> 

                {
                    !message ?
                    <MaterialCommunityIcons name='microphone' size={28} color="white"/>:
                    <MaterialIcons name='send' size={28} color="white" />
                }

                </View>
                </TouchableOpacity>
        </View>
    )
}

export default ChatInputBox