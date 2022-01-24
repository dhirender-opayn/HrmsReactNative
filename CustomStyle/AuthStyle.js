const { StyleSheet } = require("react-native");
import Colors,{color}from "../Common/Colors";

export const AuthStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        padding:10,
    },
    text: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center',

    },
    textTitile: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        alignSelf: 'center',

    },
    subText: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        marginTop: 20
    },
    inputText: {
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.color.borderLineColor,
        marginTop: 10,
        paddingStart:10,
        color:'white',
        fontSize:16
    },
    mainButtonContainer: {
        borderColor:'red',
        backgroundColor: 'red',
        marginHorizontal: 10,
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        padding: 13,
    },
    mainButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight:'bold',
        textAlign: 'center'
    },


    CardmainContainer:{
        padding:15,
        marginHorizontal:25,
        backgroundColor:'white',
        borderColor:'white',
        borderWidth:1,
        borderRadius:10,
        // backgroundColor:'#eeeeee'
    },
    Cardtext: {
        fontSize: 24,
        color: 'black',
        alignSelf: 'center',
        fontWeight:'bold',
        color: Colors.color.gray
    },
    CardinputText: {
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: color.borderLineColor,
        marginTop: 15,
        paddingStart:10,
        color:'black',
        fontSize:16
    },
   
});