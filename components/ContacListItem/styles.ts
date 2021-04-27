import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10
    },
    leftcontainer: {
        flexDirection: 'row',
    },
    midcontainer: {
        justifyContent: 'space-around'


    },
    avatar: {
        height: 60,
        width: 60,
        marginRight: 15,
        borderRadius: 50
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    status: {
        fontSize: 16,
        color: 'grey',
    },
});

export default styles;