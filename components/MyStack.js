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
import AttendanceList from "../Screens/AttendanceList";
import PopUpModal from "../helper/PopUpModal";
import AddEmployee from "../Screens/AddEmployee";
import WorkHistory from "../Screens/WorkHistory";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import AddAnnouncementView from "../Screens/AddAnnouncement";
import { AddHoliday } from "../Screens/AddHoliday";
import EmergencyLeave from "../Screens/EmergencyLeave";
import NotificationView from "../Screens/Notifications";
import AnnouncementList from "../Screens/AnnouncementsList";
import Validations from "../Common/Validations";
import NavigationOptions from "../Common/NavigationOptions";
import ImagesPath from "../images/ImagesPath";
import fonts from "../Common/fonts";

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
    <View style={{backgroundColor:color.backgroundBlack, flex: 1, alignContent: "center"}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 32,
            fontFamily: fonts.bold,
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
  const [tabRoute, setTabRoute] = useState('Home');

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{tabBarActiveTintColor: color.black, title: 'Home', headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                      <Image source={require("../images/homeBar.png")} style={{width: 28, height: 28, resizeMode: "contain",
                            tintColor: ((focused) ? color.backgroundBlack : color.darkGray)}}/>
                  ), headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20} }}
            />
            <Tab.Screen name="Profile" component={ProfileView} options={{tabBarActiveTintColor: color.black, title: 'Profile', headerStyle: CustomStyling.NavBarHeaderStyle,
                tabBarIcon: ({focused}) => (
                      <Image source={require("../images/profileBar.png")} style={{width: 28, height: 28, resizeMode: "contain", 
                      tintColor: (focused) ? color.backgroundBlack : color.darkGray}}/>
                  ), headerTitleStyle:{color:"white", fontFamily: fonts.semiBold,
                  fontSize: 20,}}}
            />
        </Tab.Navigator>
       
    );
};

const AuthStackNavigator = () => {
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginView} options={{headerShown:false}}/>
            <AuthStack.Screen name="Forget" component={Forget} options={NavigationOptions.NavHeaderStyle('')}/>
            <AuthStack.Screen name="OtpVerify" component={OtpVerify} options={NavigationOptions.NavHeaderStyle('')}/>
            <AuthStack.Screen name="ContactAdmin" component={ContactAdminView} options={NavigationOptions.NavHeaderStyle('')}/>  
        </AuthStack.Navigator>
    )
};

const AppStackNavigator = () => {
    return(
        <AppStack.Navigator>
            <AppStack.Screen options={{headerShown:false}}  name="TabView" component={AppTabViews}/>

                    <AppStack.Screen name="ChangePassword" component={ChangePasswordView} options={NavigationOptions.NavHeaderStyle('')}/>
                    <AppStack.Screen name="AddTicket" component={AddTicketView} options={NavigationOptions.NavHeaderStyle('')}/>
                    <AppStack.Screen name="CalendarScreen" component={CalendarScreen} options={NavigationOptions.NavHeaderStyle('Holiday Listing')}/>
                    <AppStack.Screen name="RequestLeaveScreen" component = {RequestLeaveScreen} options={NavigationOptions.NavHeaderStyle('Request Leave')}/>
                    <AppStack.Screen name="EditProfile" component = {EditProfileView} options={NavigationOptions.NavHeaderStyle('Edit Profile')}/>
                    <AppStack.Screen name="picker" component = {ImagePickerView} options={NavigationOptions.NavHeaderStyle('')}/>
                    <AppStack.Screen name="leaveList" component={LeavesRequestListing} options={NavigationOptions.NavHeaderStyle('Leave Requests')}/>
                    <AppStack.Screen name="leaveDetail" component={LeaveDetail} options={NavigationOptions.NavHeaderStyle('Leave Detail')}/>
                    <AppStack.Screen name="employeeList" component={EmployeeList} options={NavigationOptions.NavHeaderStyle('Employees')}/>
                    <AppStack.Screen name="employeeDetail" component={EmployeeDetail} options={NavigationOptions.NavHeaderStyle('Employee')}/>
                      <AppStack.Screen name="Attendance List" component={AttendanceList} options={NavigationOptions.NavHeaderStyle('Attendance List')}/>
                      <AppStack.Screen name="PopUpModal" component={PopUpModal} options={NavigationOptions.NavHeaderStyle('')}/>
                       <AppStack.Screen name="addEmployee" component={AddEmployee} options={NavigationOptions.NavHeaderStyle('')}/>
                      <AppStack.Screen name="workHistory" component={WorkHistory} options={NavigationOptions.NavHeaderStyle('Work History')}/>
                       <AppStack.Screen name="addAnnouncementView" component={AddAnnouncementView} options={NavigationOptions.NavHeaderStyle('')}/>
                       <AppStack.Screen name="addHoliday" component={AddHoliday} options={NavigationOptions.NavHeaderStyle('Add Holiday')}/>
                       <AppStack.Screen name="emergencyLeave" component={EmergencyLeave} options={NavigationOptions.NavHeaderStyle('Emergency Leave')}/>
                       <AppStack.Screen name="Notifications" component={NotificationView} options={NavigationOptions.NavHeaderStyle('Notification')}/>
                       <AppStack.Screen name="Announcements" component={AnnouncementList} options={NavigationOptions.NavHeaderStyle('Announcements')}/>
        </AppStack.Navigator>
    )
};
  
