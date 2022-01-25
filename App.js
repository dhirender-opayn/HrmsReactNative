import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { MyStack } from './components/MyStack';
import { OtpVerify } from './Screens/OtpVerify';
import { ToastProvider } from 'react-native-toast-notifications';


 const App = () => {
   
  return (
    //<SafeAreaView style = {{flex:1,  }}>
    <ToastProvider>
      <MyStack/>
    </ToastProvider>
   // </SafeAreaView>
    
    // <SafeAreaView style = {{flex:1,  }}>
    //   <Forget/>
    // </SafeAreaView>
   
  );
};
 
export default App;
