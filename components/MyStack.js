import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Forget } from "../Screens/Forget";
import { OtpVerify } from "../Screens/OtpVerify";
import LoginView from '../Screens/Login';
import UserDetail from '../Screens/UserDetail';
import ContactAdminView from '../Screens/ContactAdmin';
import HomeScreen from "../Screens/HomeScreen";
import ProfileView from "../Screens/Profile";
import Splash from "../Screens/Slash";
import { color } from "../Common/Colors";
import ChangePasswordView from "../Screens/ChangePassword";
import AddTicketView from "../Screens/AddTicket";
import { CalendarScreen } from "../Screens/CalendarScreen";
import { RequestLeaveScreen } from "../Screens/RequestLeaveScreen";
 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export const MyStack = () => {
    const [userdata, setData] = useState({});
     const [isLoad, setLoad] = useState(true)
    var detail =  "";
    const [deail, setDetail] = useState("");
    
    const retrieveData = async() => {
        try{
            detail =  await AsyncStorage.getItem('userData');
            console.log(detail);
            setDetail(detail)
            if (detail != "" || detail != null){
                setData(JSON.parse(detail));
            }
        }
        catch (error){
            console.error(error);
        }
        finally{
            setLoad(false);
        }
    };

    useEffect(() =>{ 
        retrieveData();
    }, []);
    return (
        // <View>
        // {(isLoad) ? <Splash /> :
            <NavigationContainer>
                <Stack.Navigator>
                    {/* { (detail == null || detail == "") ?  */}
                        <Stack.Screen name="Login" component={LoginView} options={{headerShown:false}}/>
                        {/* : (<Stack.Screen options={{headerShown:false}}  name="TabView" component={AppTabViews}/>) */}
                    {/* }        */}
                    {/* { (detail != null && detail != "") ?  */}
                        <Stack.Screen options={{headerShown:false}}  name="TabView" component={AppTabViews}/>
                         {/* : (<Stack.Screen name="Login"component={LoginView}/>) */}
                    {/* } */}
                    <Stack.Screen name="Forget" component={Forget} options={{title:'Forget'}}/>
                    <Stack.Screen name="OtpVerify" component={OtpVerify} />
                    <Stack.Screen name="ContactAdmin" component={ContactAdminView} options={{headerStyle: {
                        backgroundColor: "#28282B"//color.backgroundColor
                    }, headerTitleStyle:{color:"white"}}}
                    />               
                    <Stack.Screen name="User" component={UserDetail} options={{headerStyle: {
                        backgroundColor: "#28282B"//color.backgroundColor
                    }, headerTitleStyle:{color:"white"}}}/>
                    <Stack.Screen name="ChangePassword" component={ChangePasswordView} options={{headerStyle: {
                        backgroundColor: "#28282B"//color.backgroundColor
                    }, headerTitleStyle:{color:"white"}}}/>
                    <Stack.Screen name="AddTicket" component={AddTicketView} options={{headerStyle: {
                        backgroundColor: "#28282B"//color.backgroundColor
                    }, headerTitleStyle:{color:"white"}}}/>
                    <Stack.Screen name="CalendarScreen" component={CalendarScreen}/>
                <Stack.Screen name="RequestLeaveScreen" component = {RequestLeaveScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        // }
        // </View>
    );
}

const AppTabViews = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{tabBarActiveTintColor: color.red, headerStyle: {
                        backgroundColor: "#28282B"//color.backgroundColor
                    }, headerTitleStyle:{color:"white"} }}/>
            <Tab.Screen name="Profile" component={ProfileView} options={{tabBarActiveTintColor: color.red, headerStyle: {
                        backgroundColor: "#28282B"//color.backgroundColor
                    }, headerTitleStyle:{color:"white"}}}/>
        </Tab.Navigator>
       
    );
  };
  