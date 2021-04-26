import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ChatListItem from '../components/ChatListItem';
import data from '../data/ChatRooms'
import { useRoute } from '@react-navigation/native';



export default function ChatRoom() {


    const route = useRoute();
    // console.log(route.params)

  return (
    <View style={styles.container}>
        <Text>Chat room</Text> 
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