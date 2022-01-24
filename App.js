import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { MyStack } from './components/MyStack';
import { OtpVerify } from './Screens/OtpVerify';
 

 const App = () => {
   
  return (
    <SafeAreaView style = {{flex:1,  }}>
      {/* <MyStack/> */}
      <OtpVerify/>
    </SafeAreaView>
    
  );
};
 
export default App;
