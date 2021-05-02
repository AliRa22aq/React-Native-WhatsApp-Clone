import { FontAwesome5, Zocial } from '@expo/vector-icons'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'


const index = (props) => {

    const { data } = props
    return (
        <TouchableOpacity
            onLongPress={() => console.warn("Long pressed")}
            style={styles.container}>


            <View style={styles.leftcontainer}>

                <Image source={{ uri: data.imgUri }} style={styles.avatar} />
            </View>

            <View style={styles.rightcontainer}>
                 <Text style={styles.username}> {data.name} </Text>

                <Text style={styles.time} > {data.time} </Text>               
            </View>

            <View style={styles.icon}>
                        {/* <FontAwesome5 name="video" size={20} color={"white"} /> */}
                        <Zocial name="call" size={24} color="green" />

            </View>
                        
        </TouchableOpacity >
    )
}

export default index
