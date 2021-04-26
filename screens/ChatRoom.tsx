import * as React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
// import ChatListItem from '../components/ChatListItem';
// import data from '../data/ChatRooms'
import { useRoute } from '@react-navigation/native';
import chatRoomData from '../data/Chats'
import ChatMessage from '../components/ChatMessage'



export default function ChatRoom() {


    const route = useRoute();
    // console.log(route.params)

  return (
    <View style={styles.container}>
        <FlatList 
          data={chatRoomData.messages}
          renderItem = {({item})=> <ChatMessage message={item} /> }
          keyExtractor={(item)=> item.id }
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});