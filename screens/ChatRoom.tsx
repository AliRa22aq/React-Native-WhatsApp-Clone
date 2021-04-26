import * as React from 'react';
import {StyleSheet, View, Text, FlatList, ImageBackground} from 'react-native';
// import ChatListItem from '../components/ChatListItem';
// import data from '../data/ChatRooms'
import { useRoute } from '@react-navigation/native';
import chatRoomData from '../data/Chats'
import ChatMessage from '../components/ChatMessage'
import BG from '../assets/images/BG.png'

export default function ChatRoom() {

    const route = useRoute();
    // console.log(route.params)

  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
        <FlatList 
          data={chatRoomData.messages}
          renderItem = {({item})=> <ChatMessage message={item} /> }
          keyExtractor={(item)=> item.id }
          inverted

        />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});