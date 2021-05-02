import React from 'react'
import { Text, View, Image, TouchableOpacity} from 'react-native'
import { User } from '../../types'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import {API, graphqlOperation, Auth } from 'aws-amplify';
import {
    createChatRoom,
    createChatRoomUser
} from '../../src/graphql/mutations'


export type ContacListItemProps = {
    user: User
}

const ContacListItem = (props:ContacListItemProps) => {

    const navigation = useNavigation();


    const {user} = props


    // On click we need to ask user to make a new chat room and add other users in it
    const onClick = async () => {
        // Navigate to chatroom with this user id
        try{
            console.log('newChatRoomData')

            // 1. Create new chat room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                  createChatRoom, {
                    input: {
                         lastMessageID: "176ef15d-3252-4b5a-994c-410f35ba3f0e"
                    }
                  }
                )
              )
            console.log('newChatRoomData')
            if (!newChatRoomData){
                console.log("Failed to create a chat");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;
            console.log(newChatRoom)

            // 2. Add user to chat room
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                            userID: user.id,
                            chatRoomID: newChatRoom.id
                        }
                    }
                )
            )


            // 3. Add authentication user to the Chat Room
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                            userID: userInfo.attributes.sub,
                            chatRoomID: newChatRoom.id
                        }
                    }
                )
            )

        navigation.navigate('ChatRoom', {
            id: newChatRoom.id,
            name: "Hardcoded name"
        })


        } catch(e){
            console.log("ErrorErrorError")
            console.log(e)
        }

        }
    return (
        <TouchableOpacity 
            onPress={()=> onClick()}
            style={styles.container}>
            <View style={styles.leftcontainer}> 

            <Image source = {{uri: user.imageUri}} style={styles.avatar} />

                <View style={styles.midcontainer}> 
                    <Text style={styles.username}> {user.name} </Text>
                    <Text numberOfLines={2} style={styles.status}> {user.status} </Text>
                </View>

            </View>

        </TouchableOpacity>
    )
}

export default ContacListItem;


