import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import {Message} from '../../types'
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';


const NewMessageButton = () => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Contacts')
    }

    return (
        <View style={styles.container}>
         <TouchableOpacity onPress={onPress} >
            <MaterialCommunityIcons 
                name='message-reply-text'
                size={28}
                color= "white"
            />
        </TouchableOpacity>
        </View>
    )
}

export default NewMessageButton
