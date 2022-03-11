import React, { useMemo, useState } from "react";
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import { MyStack } from './components/MyStack';
import { OtpVerify } from './Screens/OtpVerify';
import { ToastProvider } from 'react-native-toast-notifications';
import {LoaderContext, UserProvider} from './utils/context';
import Colors from "./Common/Colors";

 const App = () => {
  const [isShowLoader, setIsShowLoader] = useState(false);
  const loaderContext = useMemo(
    () => ({
      showLoader: async () => {
        try {
          setIsShowLoader(true);
        } catch (e) {
          console.log(e);
          
        }
      },
      hideLoader: async () => {
        try {
          setIsShowLoader(false);
        } catch (e) {
          console.log(e);
        }
      },
    }),
    [],
  );
   
  return (
    <LoaderContext.Provider value={loaderContext}>
    <ToastProvider>
      <UserProvider>
      <MyStack/>
      {isShowLoader && (
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              backgroundColor:"rgba(0,0,0,0.5)"
            }}>
            <ActivityIndicator size="large" color={Colors.color.titleBlack} />
          </View>
        )}
      </UserProvider>
    </ToastProvider>
    </LoaderContext.Provider>
  );
};
export default App;
