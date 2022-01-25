import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { OtpVerify } from "./OtpVerify";
 

 const HomeScreen = ({navigation=useNavigation()}) => {
    return(
        <View>
            <OtpVerify/>
       </View>
    ); 

 };

 export default HomeScreen;