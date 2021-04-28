import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ChatListItem from '../components/ChatListItem';
import LogOutButton from '../components/LogOutButton';
import NewMessageButton from '../components/NewMessageButton';
import ChatRoom from '../data/ChatRooms'



export default function TabOneScreen() {
  return (
    <View style={styles.container}>

      <FlatList
      style={{width: '100%'}}
        data={ChatRoom}
        renderItem={({item})=> <ChatListItem chatroom={item} /> }
        keyExtractor={(item)=> item.id }
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