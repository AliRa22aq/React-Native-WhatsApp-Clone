import React, {useEffect, useState} from 'react'
import { Text, View, Image, TouchableOpacity} from 'react-native'
import { Chatroom } from '../../types'
import styles from './styles'
// import User from '../data/ChatRooms'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import {Auth} from 'aws-amplify'

export type ChatListItemProps = {
    chatRoom: Chatroom
}

const ChatListItem = (props:ChatListItemProps) => {

    const {chatRoom} = props

    const [ otherUser, setOtherUser] = useState(null);


    console.log(chatRoom.chatRoom.chatRoomUsers.items[0].user)
    // chatRoomUsers


    const user:any = chatRoom.chatRoom.chatRoomUsers.items[1].user


    useEffect(() => {
        const getOtherUser = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();
          if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
            setOtherUser(chatRoom.chatRoomUsers.items[1].user);
          } else {
            setOtherUser(chatRoom.chatRoomUsers.items[0].user);
          }
        }
        getOtherUser();
      }, [])



    const navigation = useNavigation();

    const onClick = () => {
        // console.warn(e)
        navigation.navigate('ChatRoom', {
            id: chatRoom.id,
            name: otherUser.name,
        })
    }
    return (
        <TouchableOpacity 
            onPress={()=> onClick()}
            style={styles.container}>
            <View style={styles.leftcontainer}> 

            <Image source = {{uri: user.imageUri}} style={styles.avatar} />

                <View style={styles.midcontainer}> 
                    <Text style={styles.username}> {user.name} </Text>
                    {/* <Text numberOfLines={1} style={styles.lastmessage}> {chatRoom.lastMessage.content} </Text> */}
                    <Text> Hello </Text>
                </View>

            </View>

            {/* <Text> {chatRoom.lastMessage.createdAt} </Text> */}
            <Text style={styles.time} > 
                {/* {moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")} */}
            </Text>

        </TouchableOpacity>
    )
}

export default ChatListItem


