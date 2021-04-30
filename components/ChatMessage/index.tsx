import moment from 'moment';
import React from 'react'
import { View, Text } from 'react-native';
import {Message} from '../../types'
import styles from './styles';


export type ChatMessageProps = {
    message: Message;
    myId: String;
}

const index = (props: ChatMessageProps) => {

    const {message, myId} =  props;
    console.log('myId')
    console.log(myId)


    const isMyMessage = () => {
        return message.user.id === myId
    }
    console.log(isMyMessage())

    return (
        <View style={styles.container}>
        <View style={[
                styles.messageBox, {
                backgroundColor: isMyMessage()? '#DCF8C5': "white",
                marginRight: isMyMessage()? 0 : 50,
                marginLeft: isMyMessage()? 50 : 0
                }]}>
            {
                !isMyMessage() && <Text style={styles.name}>{ message.user.name}  </Text>
            }

            <Text style={styles.message}>{ message.content}  </Text>
            <Text style={styles.time}>{ moment(message.createdAt).fromNow()}  </Text>
        </View>
        </View>
    )
}

export default index
