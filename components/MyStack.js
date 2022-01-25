import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Forget } from "../Screens/Forget";
import { OtpVerify } from "../Screens/OtpVerify";
 
const Stack = createNativeStackNavigator();
export const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Forget" component={Forget} options={{title:'Forget'}}/>
                <Stack.Screen name="OtpVerify" component={OtpVerify} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}