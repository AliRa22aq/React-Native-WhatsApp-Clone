import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ChatMessage from '../components/ChatMessage'
import BG from '../assets/images/BG.png'
import ChatInputBox from '../components/ChatInputBox';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { messagesByChatRoom } from './messageByChatQuery'
import { onCreateMessage, onDeleteMessage } from '../src/graphql/subscriptions'



export default function ChatRoom() {

  const [messages, setMessages] = useState([])

  const [myId, setMyId] = useState(null);

  console.log('messages')
  console.log(messages)

  const route = useRoute();
  // console.log(route.params.id)


  //GetMessagesByChatRoom
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

  //getMyId
  useEffect(() => {
    const getMyId = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyId(userInfo.attributes.sub);
    }
    getMyId();
  }, [])

  //onCreateMessage subsription
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage

        if (newMessage.chatRoomID !== route.params.id) {
          return;
        }
        setMessages(messages => [newMessage, ...messages]);
      }
    });

    return () => subscription.unsubscribe();

  }, [])

  //onDeleteMessage subsription
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onDeleteMessage)
    ).subscribe({
      next: (data) => {
        const deletedMessage = data.value.data.onDeleteMessage
        // console.log('deletedMessage')
        // console.log(deletedMessage.id)
        setMessages(messages => messages.filter( (x: {id: any}) => {return x.id !== deletedMessage.id }))

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