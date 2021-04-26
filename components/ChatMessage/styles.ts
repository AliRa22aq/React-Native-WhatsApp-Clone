import {StyleSheet} from 'react-native'
import Colors  from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        padding: 5,

    },
    messageBox: {
        borderRadius: 5,
        padding: 5,
    },
    name: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginBottom: 5

    },
    message: {

    },
    time: {
        alignSelf: "flex-end",
        color: 'grey'
    },
});

export default styles;