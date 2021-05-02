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
                        
        </TouchableOpacity >
    )
}

export default index
