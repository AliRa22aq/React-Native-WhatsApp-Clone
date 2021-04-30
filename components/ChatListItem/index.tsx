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
    // console.log('chatRoom')
    // console.log(chatRoom)

    const [ otherUser, setOtherUser] = useState(null);

    useEffect(() => {
        const getOtherUser = async () => {

            const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true})
                    
           if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
              
          setOtherUser(chatRoom.chatRoomUsers.items[1].user);

          } else {
            setOtherUser(chatRoom.chatRoomUsers.items[0].user);

            setOtherUser(chatRoom.chatRoomUsers.items[0].user);
          }
        }
        getOtherUser();
      }, [])

    const navigation = useNavigation();

    const onClick = () => {
        console.warn('CLICKED')
        navigation.navigate('ChatRoom', {
            id: chatRoom.id,
            name: otherUser.name,
        })
    }

    if (!otherUser) {
        return null;
      }

    return (
        <TouchableOpacity 
            onPress={()=> onClick()}
            style={styles.container}>
            <View style={styles.leftcontainer}> 

            <Image source = {{uri: otherUser?.imageUri}} style={styles.avatar} />

                <View style={styles.midcontainer}> 
                    <Text style={styles.username}> {otherUser?.name} </Text>
                    <Text numberOfLines={2} 
                          style={styles.lastmessage}> 
                            {chatRoom.lastMessage?
                                `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`     :
                                null
                            } 
                                
                                </Text>
                </View>

            </View>

            {/* <Text> {chatRoom.lastMessage.createdAt} </Text> */}
            <Text style={styles.time} > 
                {chatRoom.lastMessage && moment(chatRoom.lastMessage.updatedAt).format("DD/MM/YYYY")}
            </Text>

        </TouchableOpacity>
    )
}

export default ChatListItem


