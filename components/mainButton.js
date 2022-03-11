import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { AuthStyle } from "../CustomStyle/AuthStyle"
 
 
export const MainButton = ({text,onPress,viewStyle}) =>{
    return (
        <TouchableOpacity onPress={onPress}>
            <View style = {[AuthStyle.mainButtonContainer, viewStyle]}>
                <Text style = {AuthStyle.mainButtonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}