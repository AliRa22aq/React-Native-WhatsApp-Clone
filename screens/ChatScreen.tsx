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
import { onUpdateChatRoom } from '../src/graphql/subscriptions'

export default function ChatScreen() {

  const [chatRooms, setChatRooms] = useState([])

  // console.log('chatRooms')
  // console.log(chatRooms)

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


  return (
    <View style={styles.container}>

      <FlatList
        style={{ width: '100%' }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      // inverted
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