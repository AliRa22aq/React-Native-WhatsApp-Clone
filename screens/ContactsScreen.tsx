import React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ContacListItem from '../components/ContacListItem';
import { listUsers } from '../src/graphql/queries';
import {API, graphqlOperation } from 'aws-amplify';

export default function Contacts() {

  const [users, setUsers] = useState([]);
  // console.log(users)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        setUsers(usersData.data.listUsers.items);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, [])


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