import moment from 'moment';
import React from 'react'
import { View, Text, Pressable, Alert } from 'react-native';
import { Message } from '../../types'
import styles from './styles';

import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify'
import { deleteMessage } from '../../src/graphql/mutations';


export type ChatMessageProps = {
    message: Message;
    myId: String;
}

const index = (props: ChatMessageProps) => {

    const route = useRoute();
    console.log(route.params.id)
    // console.log(route.params.name)

    const { message, myId } = props;
    // console.log('message.id')
    // console.log(message.id)

    const isMyMessage = () => {
        return message.user.id === myId
    }

    // deleteMessageFunction
    const deleteMessageFunction = async () => {
        await API.graphql(
            graphqlOperation(
                deleteMessage, {
                input: {
                    id: message.id
                }
            }
            )
        )
    }

    const showAlert = () => {
        Alert.alert(
            "Excuse me",
            "What to delete this message?",
            [
                {
                    text: "Yes",
                    onPress: deleteMessageFunction,
                },
                {
                    text: "No",
                },
            ],
        )
    }
        
        return (
            <View>
            <Pressable style={styles.container} onLongPress={showAlert}>
            <View style={[
                styles.messageBox, {
                    backgroundColor: isMyMessage() ? '#9ed0ff' : "white",
                    marginRight: isMyMessage() ? 0 : 50,
                    marginLeft: isMyMessage() ? 50 : 0
                }]}>
                {
                    !isMyMessage() && <Text style={styles.name}>{message.user.name}  </Text>
                }

                <Text style={styles.message}>{message.content}  </Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}  </Text>
            </View>
        </Pressable>
        </View>
    )
}

export default index
