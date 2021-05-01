import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground } from 'react-native';
// import ChatListItem from '../components/ChatListItem';
// import data from '../data/ChatRooms'
import { useRoute } from '@react-navigation/native';
// import chatRoomData from '../data/Chats'
import ChatMessage from '../components/ChatMessage'
import BG from '../assets/images/BG.png'
import ChatInputBox from '../components/ChatInputBox';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { messagesByChatRoom } from './messageByChatQuery'
import { onCreateMessage } from '../src/graphql/subscriptions'



export default function ChatRoom() {

  const [messages, setMessages] = useState([])
  const [myId, setMyId] = useState(null);

  const route = useRoute();
  // console.log(route.params.id)

  useEffect(() => {
    const fetchMessages = async () => {
      const messageData = await API.graphql(
        graphqlOperation(
          messagesByChatRoom, {
          chatRoomID: route.params.id,
          sortDirection: "DESC",
        }
        )
      )
      console.log("FETCH MESSAGES")
      setMessages(messageData.data.messagesByChatRoom.items)
    }
    fetchMessages()
  }, [])

  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    }
    getMyId();
  }, [])

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        // console.log('data from subsriptioon')
        // console.log(data.value.data.onCreateMessage)
        const newMessage = data.value.data.onCreateMessage
        console.log('newMessagenewMessagenewMessagenewMessage')
        console.log(data.value.data.onCreateMessage)
        console.log('newMenewMessagenewMessagenewMessagessage')

        if (newMessage.chatRoomID !== route.params.id) {
          return;
        }
        setMessages(messages => [newMessage, ...messages]);
      }
    });

    return () => subscription.unsubscribe();

  }, [])

  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={BG}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        keyExtractor={(item) => item.id}
        inverted

      />

      <ChatInputBox chatRoomID={route.params.id} />

    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});