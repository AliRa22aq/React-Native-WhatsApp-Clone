import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ChatListItem from '../components/ChatListItem';
import LogOutButton from '../components/LogOutButton';
import NewMessageButton from '../components/NewMessageButton';
// import ChatRooms from '../data/ChatRooms'

import {
  API, 
  graphqlOperation,
  Auth
} from 'aws-amplify'

import {getUser} from './queries'
import {updateChatRoom} from '../src/graphql/mutations'

export default function ChatScreen() {

  const [chatRooms, setChatRooms] = useState([])

  // console.log(chatRooms)


  useEffect(()=> {
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
        //items[0].chatRoom.chatRoomUsers.items
        // console.log(userData.data.getUser.chatRoomUser.items)
        setChatRooms(userData.data.getUser.chatRoomUser.items)

      } catch(e){
        console.log("From CHat Scrreeeeeeen")
        console.log("Error :" + e)
      }
    }
    fetchChatRooms()
  }, [])


  useEffect( ()=> {

    const subscription = API.graphql(
      graphqlOperation(updateChatRoom)
    ).subscribe({
      next: ({ provider, value }) => console.log({ provider, value }),
      error: error => console.warn(error)
    });


    // const subscription = API.graphql(graphqlOperation(updateChatRoom)).subscribe({
    //   next: (data) => console.log(data)
    // })
  //     .subscribe({
  //     next: (data) => {
  //       console.log('data from subsriptioon')
  // //       console.log(data)
  // //       // const newMessage = data.value.data.onCreateMessage
  //     }
  //   });

  //   return () => subscription.unsubscribe();

  }, [])



  return (
    <View style={styles.container}>

      <FlatList
      style={{width: '100%'}}
        data={chatRooms}
        renderItem={({item})=> <ChatListItem chatRoom={item.chatRoom} /> }
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