import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Status from '../components/Status';
import LogOutButton from '../components/LogOutButton';
import NewMessageButton from '../components/NewMessageButton';


export default function StatusScreen() {

   const dummyStatusData = [
     {
       id: '0',
       imgUri: 'https://www.kahanihindi.com/wp-content/uploads/2020/02/Whatsapp-DP-images-1.jpg',
       name: 'Ali',
       time: '10 minutes'
    },
    {
      id: '1',
      imgUri: 'https://i0.wp.com/www.kahanihindi.com/wp-content/uploads/2020/02/Whatsapp-DP-images-25.jpg?resize=450%2C400&ssl=1',
      name: 'Asim',
      time: '20 minutes'
   },
   {
    id: '2',
    imgUri: 'https://1.bp.blogspot.com/-_WDnAA_G-jw/XrpI2fBzPvI/AAAAAAAAD3c/StwdwPIBuiM6UZGMXFFi4n_I-tknd-ubgCLcBGAsYHQ/s1600/Best%2B-%2BLetter%2BA%2BName%2BDp%2BImages%2BFor%2BWhatsapp%2B8.jpg',
    name: 'Waqar',
    time: '30 minutes'
 },
   ]


  return (

    <View style={styles.container}>

      <FlatList
        style={{ width: '100%' }}
        data={dummyStatusData}
        renderItem={({ item }) => <Status data={item} />}
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
  },
  scrollView: {

  }
});