import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Forget } from './Screens/Forget';
import { HomeScreen } from './Screens/HomeScreen';

 const App = () => {
   
  return (
    <SafeAreaView style = {{flex:1,  }}>
      <Forget/>
    </SafeAreaView>
    
  );
};
 

export default App;
