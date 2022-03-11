import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { AuthStyle } from "../CustomStyle/AuthStyle"
 
 
export const TextButton = (
    {
        text,
        onPress,
        viewStyle,
        textStyle,
    }) =>{
    return (
        <TouchableOpacity onPress={onPress} style={viewStyle}>
            <Text style = {[AuthStyle.textButtonText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}