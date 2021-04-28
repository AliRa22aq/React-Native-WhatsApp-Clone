import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import {Message} from '../../types'
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';


const LogOutButton = () => {

async function signOut() {
    try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

    return (
        <View style={styles.container}>
         <TouchableOpacity onPress={signOut} >
            <MaterialCommunityIcons 
                name='logout'
                size={28}
                color= "white"
            />
        </TouchableOpacity>
        </View>
    )
}

export default LogOutButton
