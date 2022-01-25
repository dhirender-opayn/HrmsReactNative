import React from "react";
import { SafeAreaView, Text, View } from "react-native";
 import { useNavigation } from "@react-navigation/native";
 import UserData from "../Common/UserData";

 const HomeScreen = ({navigation=useNavigation()}) => {
    return(
        <View>
            <Text>UserData.userData.user.name</Text>
       </View>
    ); 

 };

 export default HomeScreen;