import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Forget } from './Screens/Forget';
import { HomeScreen } from './Screens/HomeScreen';
import LoginView from './Screens/Login';
import UserDetail from './Screens/UserDetail';
import ContactAdminView from './Screens/ContactAdmin';

const Stack = createNativeStackNavigator();

 const App = () => {
   
  return (
    // <SafeAreaView style = {{flex:1,  }}>
    //   <Forget/>
    // </SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Login"
            component={LoginView}/>
          <Stack.Screen name="User"
            component={UserDetail}/>
          <Stack.Screen name="ContactAdmin"
           component={ContactAdminView}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};
 

export default App;
