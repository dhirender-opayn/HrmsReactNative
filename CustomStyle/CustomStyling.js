const { StyleSheet } = require("react-native");
import Colors,{color}from "../Common/Colors";

export const CustomStyling = StyleSheet.create({
    imageThumb:{
        marginTop: 20,
        height:80,
        width:80,
        borderRadius: 40,
        alignSelf:'center',
    },
    title:{
        fontSize:20,
        color:color.white,
        alignSelf:'center',
        fontWeight:'bold',
    },
    btnTitle:{
        fontSize:18,
        color:color.white,
        alignSelf:'center',
        fontWeight:'bold',
    },
    subTitle:{
        fontSize:16,
        color:color.white,
        alignSelf:'center',
        fontWeight:'bold', 
    },
    listTitle:{
        fontSize:16,
        color:color.subtitleBlack,
        fontWeight:'bold', 
        paddingHorizontal: 8
    },
    textcontainer:{
        fontSize:18,
        color:color.gray,
        alignSelf:'center',
        fontWeight:'600',
    },
    UserNameText: {
        fontWeight: 'bold',
        numberOfLines: 2,
        fontSize: 20,
        color: 'white',
        padding: 8
    },
    userDesignationText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingHorizontal: 8
    },
    editImageView: {
        width:80, 
        height: 80, 
        borderRadius: 40, 
        marginTop: -80, 
        borderWidth: 1, 
        borderColor: color.red, 
        alignSelf: "center"
    },
    editImageBtn: {
        width:32, 
        height: 32, 
        borderRadius: 16, 
        marginTop: -40, 
        borderWidth: 1, 
        borderColor: color.red, 
        marginStart: 80,
        alignSelf: "center"
    }
});