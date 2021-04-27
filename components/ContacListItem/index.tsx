import React from 'react'
import { Text, View, Image, TouchableOpacity} from 'react-native'
import { User } from '../../types'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';


export type ContacListItemProps = {
    user: User
}

const ContacListItem = (props:ContacListItemProps) => {

    const {user} = props

    // const navigation = useNavigation();

    const onClick = () => {
        // Navigate to chatroom with this user id

        }
    return (
        <TouchableOpacity 
            onPress={()=> onClick()}
            style={styles.container}>
            <View style={styles.leftcontainer}> 

            <Image source = {{uri: user.imageUri}} style={styles.avatar} />

                <View style={styles.midcontainer}> 
                    <Text style={styles.username}> {user.name} </Text>
                    <Text numberOfLines={2} style={styles.status}> {user.status} </Text>
                </View>

            </View>

        </TouchableOpacity>
    )
}

export default ContacListItem;


