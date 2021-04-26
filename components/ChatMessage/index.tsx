import React from 'react'
import { View, Text } from 'react-native';
import {Message} from '../../types'


export type ChatMessageProps = {
    message: Message;
}

const index = (props: ChatMessageProps) => {

    const {message} =  props;


    return (
        <View>
            <Text>{ message.content}  </Text>
        </View>
    )
}

export default index
