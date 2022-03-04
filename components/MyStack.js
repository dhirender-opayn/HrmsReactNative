import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useMemo, useReducer } from "react";
import { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Colors, { color } from "../Common/Colors";
import ChangePasswordView from "../Screens/ChangePassword";
import AddTicketView from "../Screens/AddTicket";
import { CalendarScreen } from "../Screens/CalendarScreen";
import { RequestLeaveScreen } from "../Screens/RequestLeaveScreen";
import EditProfileView from "../Screens/EditProfile";
import ImagePickerView from "../Screens/ImagePickerView";
import {AuthContext, UserContext} from '../utils/context';
 import { navigationTheme } from "./navigationTheme";
 import rootNavigation, { navigationRef } from "./rootNavigation";
import { setDefaultHeader } from "../utils/httpClient";
import LeavesRequestListing from "../Screens/LeavesRequestListing";
import LeaveDetail from "../Screens/LeaveDetail";
import EmployeeList from "../Screens/EmployeeList";
import EmployeeDetail from "../Screens/EmployeeDetail";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export const MyStack = () => {
    
    const [userData, setUserData] = useContext(UserContext);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        console.log("Logim")
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        console.log("Logout")
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        const userToken = data?.data?.token.toString();
        console.log("aCSignIn")
        console.log("UserDaata: " + data);
        console.log("Toen; " + userToken)
        // console.log('userToken: ', userToken);
        // setUser(data);
        try {
          await AsyncStorage.setItem('localuserdata', JSON.stringify(data));
          setUserData(data.data)
          await AsyncStorage.setItem('userToken', userToken);
          await setDefaultHeader('token', userToken);
          console.log(userToken);
          dispatch({type: 'LOGIN', id: 'userName', token: userToken});
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        console.log("aCSignOut")
        try {
          await AsyncStorage.removeItem('localuserdata');
          await AsyncStorage.removeItem('userToken');
          await setDefaultHeader('token', '');
          dispatch({type: 'LOGOUT'});
        } catch (e) {
          console.log(e);
        }
      },
    }),
    [],
  );
  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
    }, 5000);
  }, []);
  useEffect(() => {
    getToken();
  }, []);
  {
  }

  async function getToken() {
    try {
      let userData = await AsyncStorage.getItem('localuserdata');
      // console.log('userData: ', userData);
      let userToken = await AsyncStorage.getItem('userToken');
      // console.log('getUserToken: ', userToken);
      if (userToken != null || undefined) {
        setUserData(JSON.parse(userData).data);
       // await setDefaultHeader(userToken);
        await setDefaultHeader('token', userToken);
        // axios.defaults.headers.common.token = userToken;
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
      } else {
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
      }
    } catch (error) {
       console.log('error: ', error);
    }
  }

  if (loginState.isLoading) {
    return (
    //   <LinearGradient
    //     start={{x: 1.0, y: 0}}
    //     end={{x: 1.0, y: 1.0}}
    //     locations={[0, 0.5, 1]}
    //     colors={['#2C1151', '#36103E', '#592635']}
    //     style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View style={{backgroundColor:'#000', flex: 1, alignContent: "center"}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: '700',
            textAlign: "center"
          }}>{`Opayn HRMS`}</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loginState.userToken == null || undefined ? (
            <Stack.Screen name="Auth" component={AuthStackNavigator} />
          ) : (
            <Stack.Screen name="App" component={AppStackNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};


const AppTabViews = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{tabBarActiveTintColor: color.red, headerStyle: {
                        backgroundColor: "#28282B"
                    }, tabBarIcon: ({color}) => (
                      <Image source={require("../images/homeBar.png")} style={{width: 32, height: 32, resizeMode: "contain"}}/>
                  ), headerTitleStyle:{color:"white"} }}/>
            <Tab.Screen name="Profile" component={ProfileView} options={{tabBarActiveTintColor: color.red, headerStyle: {
                        backgroundColor: "#28282B", 
                    }, tabBarIcon: ({color}) => (
                      <Image source={require("../images/profileBar.png")} style={{width: 32, height: 32, resizeMode: "contain", tintColor: Colors.color.darkGray}}/>
                  ), headerTitleStyle:{color:"white"}}}/>
        </Tab.Navigator>
       
    );
};

const AuthStackNavigator = () => {
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginView} options={{headerShown:false}}/>
            <AuthStack.Screen name="Forget" component={Forget} options={{title:'Forget'}}/>
            <AuthStack.Screen name="OtpVerify" component={OtpVerify} />
            <AuthStack.Screen name="ContactAdmin" component={ContactAdminView} options={{headerStyle: {
                backgroundColor: "#28282B"
                }, headerTitleStyle:{color:"white"}}}
            />  
        </AuthStack.Navigator>
    )
};

const AppStackNavigator = () => {
    return(
        <AppStack.Navigator>
            <AppStack.Screen options={{headerShown:false}}  name="TabView" component={AppTabViews}/>

            <AppStack.Screen name="User" component={UserDetail} options={{headerStyle: {
                        backgroundColor: "#28282B"
                    }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="ChangePassword" component={ChangePasswordView} options={{headerStyle: {
                        backgroundColor: "#28282B"
                    }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="AddTicket" component={AddTicketView} options={{headerStyle: {
                        backgroundColor: "#28282B"
                    }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="CalendarScreen" component={CalendarScreen} options={{headerStyle: {
                        backgroundColor: "#28282B"
                    }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="RequestLeaveScreen" component = {RequestLeaveScreen} options={{headerStyle: {
                        backgroundColor: "#28282B"
                    }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="EditProfile" component = {EditProfileView} options={{headerStyle: {
                        backgroundColor: "#28282B"
                    }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="picker" component = {ImagePickerView} options={{headerStyle: {
                        backgroundColor: "#28282B"
                    }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="leaveList" component={LeavesRequestListing} options={{headerStyle: {
                        backgroundColor: "#282828"
                      }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="leaveDetail" component={LeaveDetail} options={{headerStyle: {
                        backgroundColor: "#282828"
                      }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="employeeList" component={EmployeeList} options={{headerStyle: {
                        backgroundColor: "#282828"
                      }, headerTitleStyle:{color:"white"}}}/>
                    <AppStack.Screen name="employeeDetail" component={EmployeeDetail} options={{headerStyle: {
                        backgroundColor: "#282828"
                      }, headerTitleStyle:{color:"white"}}}/>
        </AppStack.Navigator>
    )
};
  