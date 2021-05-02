import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity, Pressable, Alert } from 'react-native'
import { Chatroom } from '../../types'
import styles from './styles'
// import User from '../data/ChatRooms'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { API, Auth, graphqlOperation } from 'aws-amplify'
import { deleteChatRoom } from '../../src/graphql/mutations';
// import { messagesByChatRoom } from '../../src/graphql/queries';
// import { onUpdateChatRoom } from '../../src/graphql/subscriptions'


export type ChatListItemProps = {
    chatRoom: Chatroom
}


const ChatListItem = (props: ChatListItemProps) => {

    const { chatRoom } = props;
    const [otherUser, setOtherUser] = useState({});
    // console.log('chatRoom from Chat items')
    // console.log(chatRoom)

    useEffect(() => {
        const getOtherUser = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
                setOtherUser(chatRoom.chatRoomUsers.items[1].user)
            } else {
                setOtherUser(chatRoom.chatRoomUsers.items[0].user)
            }
        }
        getOtherUser();
    }, [])

    // delete messaaage
    const deleteChat = async () => {

        // console.log(chatRoom.id)
        await API.graphql(
            graphqlOperation(
                deleteChatRoom, {
                input: {
                    id: chatRoom.id
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
                    onPress: deleteChat,
                },
                {
                    text: "No",
                },
            ],
        )
    }


    const navigation = useNavigation();

    const onClick = () => {
        // console.warn('CLICKED')
        navigation.navigate('ChatRoom', {
            id: chatRoom.id,
            name: otherUser.name,
        })
    }


    if (!otherUser || !chatRoom) {
        return null;
    }


    return (
        <View>
            <TouchableOpacity
                onLongPress={showAlert}
                onPress={() => onClick()}
                style={styles.container}>
                <View style={styles.leftcontainer}>

                    <Image source={{ uri: otherUser?.imageUri }} style={styles.avatar} />

                    <View style={styles.midcontainer}>
                        <Text style={styles.username}> {otherUser.name} </Text>
                        <Text numberOfLines={2}
                            style={styles.lastmessage}>
                            {chatRoom.lastMessage && `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`}

                        </Text>
                    </View>

                </View>

                {/* <Text> {chatRoom.lastMessage.createdAt} </Text> */}
                <Text style={styles.time} >
                    {chatRoom.lastMessage && moment(chatRoom.lastMessage.updatedAt).format("DD/MM/YYYY")}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default ChatListItem


