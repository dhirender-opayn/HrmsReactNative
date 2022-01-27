import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Forget } from "../Screens/Forget";
import { OtpVerify } from "../Screens/OtpVerify";
import LoginView from '../Screens/Login';
import UserDetail from '../Screens/UserDetail';
import ContactAdminView from '../Screens/ContactAdmin';
import HomeScreen from "../Screens/HomeScreen";
import ProfileView from "../Screens/Profile";
import { CalendarScreen } from "../Screens/CalendarScreen";
import { RequestLeaveScreen } from "../Screens/RequestLeaveScreen";
 
const Stack = createNativeStackNavigator();
export const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login"component={LoginView}/>
                <Stack.Screen options={{headerShown:false}}  name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="Forget" component={Forget} options={{title:'Forget'}}/>
                <Stack.Screen name="OtpVerify" component={OtpVerify} />
                <Stack.Screen name="ContactAdmin" component={ContactAdminView}/>               
                <Stack.Screen name="User" component={UserDetail}/>
                <Stack.Screen name="Profile" component={ProfileView}/>
                <Stack.Screen name="CalendarScreen" component={CalendarScreen}/>
                <Stack.Screen name="RequestLeaveScreen" component = {RequestLeaveScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}