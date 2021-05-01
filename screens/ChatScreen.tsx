import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import LogOutButton from '../components/LogOutButton';
import NewMessageButton from '../components/NewMessageButton';
// import ChatRooms from '../data/ChatRooms'

import {
  API,
  graphqlOperation,
  Auth
} from 'aws-amplify'

import { getUser } from './queries'
import { onUpdateChatRoom, onDeleteChatRoom } from '../src/graphql/subscriptions'

export default function ChatScreen() {

  const [chatRooms, setChatRooms] = useState([])

  // console.log('chatRooms')
  // console.log(chatRooms)


  // Fetch Chatrooms
  useEffect(() => {

    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const userData = await API.graphql(
          graphqlOperation(
            getUser, {
            id: userInfo.attributes.sub
          }
          )
        )

        setChatRooms(userData.data.getUser.chatRoomUser.items)

      } catch (e) {
        console.log("Error :" + e)
      }
    }
    fetchChatRooms();
  }, [])


  // onUpdateChatRoom subscription
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom)
    ).subscribe({
      next: (data) =>{ 
        const newChatRoom = data.value.data.onUpdateChatRoom;
        // setChatRooms(chatRooms => [newChatRoom, ...chatRooms])
      }
    });

    return () => subscription.unsubscribe();
  }, [])

    // DeleteChatRoom Subscription
    useEffect(() => {
      const subscription = API.graphql(
        graphqlOperation(onDeleteChatRoom)
      ).subscribe({
        next: (data) => {
          const deletedChatRoom = data.value.data.onDeleteChatRoom
          console.log('deletedChatRoom')
          console.log(deletedChatRoom)
          // setMessages(messages => messages.filter( (x: {id: any}) => {return x.id !== deletedMessage.id }))
  
        }
      });
  
      return () => subscription.unsubscribe();

    }, [])


  return (
    <View style={styles.container}>

      <FlatList
        style={{ width: '100%' }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />

      <NewMessageButton />
      <LogOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});