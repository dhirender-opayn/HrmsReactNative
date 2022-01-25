const { StyleSheet } = require("react-native");
import Colors,{color}from "../Common/Colors";

export const CustomStyling = StyleSheet.create({
    imageThumb:{
        height:80,
        width:80,
        alignSelf:'center',
    },
    title:{
        fontSize:20,
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
    textcontainer:{
        fontSize:18,
        color:color.gray,
        alignSelf:'center',
        fontWeight:'600',
    }
    
});