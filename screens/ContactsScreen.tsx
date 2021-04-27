import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ContacListItem from '../components/ContacListItem';
import users from '../data/Users'


export default function Contacts() {
  return (
    <View style={styles.container}>

      <FlatList
      style={{width: '100%'}}
        data={users}
        renderItem={({item})=> <ContacListItem user = {item} /> }
        keyExtractor={(item)=> item.id }
        // inverted
      />
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