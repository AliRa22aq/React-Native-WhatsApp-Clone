import {StyleSheet} from 'react-native'
import Colors  from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'flex-end',
        borderRadius: 25,

    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        marginRight: 10, 
        flex: 1,
        alignItems: 'flex-end'

    },
    buttonContainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textInput: {
        flex: 1,
        marginHorizontal: 10

    },
    icon: {
        marginHorizontal: 5

    },
    time : {
        fontSize: 13,
        color: 'grey',
        top: 15,
        right: 10,
        position: 'absolute' 
    }

});

export default styles;