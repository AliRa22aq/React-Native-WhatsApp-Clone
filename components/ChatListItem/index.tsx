import React from 'react'
import { Text, View, Image, TouchableOpacity} from 'react-native'
import { Chatroom } from '../../types'
import styles from './styles'
// import User from '../data/ChatRooms'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';


export type ChatListItemProps = {
    chatroom: Chatroom
}

const ChatListItem = (props:ChatListItemProps) => {

    const {chatroom} = props
    //  console.log(chatroom.users[0])
    const user:any = chatroom.users[1]

    const navigation = useNavigation();

    const onClick = () => {
        // console.warn(e)
        navigation.navigate('ChatRoom', {
            id: chatroom.id,
            name: user.name
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
                    <Text numberOfLines={1} style={styles.lastmessage}> {chatroom.lastMessage.content} </Text>
                </View>

            </View>

            {/* <Text> {chatroom.lastMessage.createdAt} </Text> */}
            <Text style={styles.time} > 
                {moment(chatroom.lastMessage.createdAt).format("DD/MM/YYYY")}
            </Text>

        </TouchableOpacity>
    )
}

export default ChatListItem


