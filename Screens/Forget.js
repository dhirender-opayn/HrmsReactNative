import { Text, View } from "react-native";
import React from "react";
import Global from "../Common/Global";

export const Forget =()=>{
    return(
        <View style ={{flex :1}}>
            
            <Text style={{color:'black'}}>{Global.dummy}</Text>
            {/* <Text>Enter the email associated </Text> */}
        </View>
    );
}