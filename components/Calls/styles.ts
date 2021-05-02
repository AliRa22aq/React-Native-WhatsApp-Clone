import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        // justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    rightcontainer: {
        // flexDirection: 'row',
        // alignItems: 'center'
    },
    midcontainer: {


    },
    avatar: {
        height: 60,
        width: 60,
        marginRight: 15,
        borderRadius: 50,
        borderColor: '#42f542',
        borderWidth: 2
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        top: 0
    },
    time : {
        fontSize: 13,
        color: 'grey',
        top: 0,
        left: 0,
        // position: 'absolute',
    },
    icon : {
        fontSize: 13,
        color: 'grey',
        top: 25,
        right: 25,
        position: 'absolute' 
    }
});

export default styles;