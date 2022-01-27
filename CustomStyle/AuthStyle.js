const { StyleSheet } = require("react-native");
import Colors,{color}from "../Common/Colors";

export const AuthStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
    
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
        alignSelf: 'center',
        
    },
    subText: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        marginTop: 20
    },
    inputText: {
        color:color.subtitleBlack,
        fontSize:16,
        height: 50, 
        borderWidth:1, 
        borderColor:Colors.color.lightGray, 
        borderRadius: 8, 
        padding: 8,
        marginBottom: 16,
        fontSize: 16
    },
    mainButtonContainer: {
        borderColor:'red',
        backgroundColor: 'red',
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
        borderWidth:1,
        borderRadius: 12,
        borderColor: Colors.color.lightGray,
        paddingVertical: 24, 
        paddingHorizontal: 16,
        margin: 16
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