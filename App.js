import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { MyStack } from './components/MyStack';
import { OtpVerify } from './Screens/OtpVerify';
import { ToastProvider } from 'react-native-toast-notifications';
import {LoaderContext, UserProvider} from './utils/context';

 const App = () => {
   
  return (
    <ToastProvider>
      <UserProvider>
      <MyStack/>
      </UserProvider>
    </ToastProvider>
  );
};
export default App;
