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
    viewTitile: {
        fontFamily: 'Asap-Bold',
        fontSize: 26,
        alignSelf: 'center',
        color: 'white'
    },
    viewSubTitile: {
        fontFamily: 'Asap-SemiBold',
        fontSize: 26,
        alignSelf: 'center',
        color: 'white'
    },
    medium16Text: {
        fontSize: 16,
        fontFamily: 'Asap-Medium',
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: 24
    },
    inputText: {
        height: 50, 
        borderWidth:1, 
        borderColor: Colors.color.lightGray, 
        borderRadius: 8, 
        padding: 8,
        marginBottom: 20,
        fontSize: 16
    },
    mainButtonContainer: {
        borderColor:color.red,
        backgroundColor: color.red,
        marginTop: 20,
        borderRadius: 16,
        borderWidth: 1,
        height: 50,
        justifyContent: "center"
    },
    mainButtonText: {
        fontSize: 18, 
        fontFamily: "Asap-Bold", 
        color: '#fff',
        textAlign: "center"
    },
    textButtonText: {
        fontSize: 16, 
        fontFamily: "Asap-SemiBold", 
        color: Colors.color.red
    },

    CardmainContainer:{
        marginHorizontal:25,
        backgroundColor:'white',
        borderWidth:0,
        borderRadius: 12,
        borderColor: Colors.color.lightGray,
        paddingVertical: 24, 
        paddingHorizontal: 16,
        margin: 16,
        shadowColor: Colors.color.lightGray,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2,
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
    IconInputView: {
        height: 50, 
        borderWidth:1, 
        borderColor: Colors.color.lightGray, 
        borderRadius: 8, 
       // padding: 8,
        marginBottom: 20,
        flexDirection: "row",

    },
    downloadView: {
        borderWidth:1, 
        borderColor: Colors.color.lightGray, 
        borderRadius: 8, 
        marginBottom: 20,
        flexDirection: "row",
        marginTop: 16
    },
   
});