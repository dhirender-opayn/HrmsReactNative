import React, { useMemo, useState } from "react";
import { View, ActivityIndicator } from 'react-native';
import { MyStack } from './components/MyStack';
import {LoaderContext, UserProvider} from './utils/context';
import Colors, { color } from "./Common/Colors";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import fonts from "./Common/fonts";

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
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: color.green, backgroundColor: color.green }}
        contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: color.green, margin: 4 }}
        text1Style={{
          fontSize: 14,
          fontFamily: fonts.semiBold,
          color: color.white
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: color.darkRed, backgroundColor: color.darkRed }}
        contentContainerStyle={{ paddingHorizontal: 12, backgroundColor: color.darkRed, margin: 4 }}
        text1Style={{
          fontSize: 14,
          fontFamily: fonts.semiBold,
          color: color.white,
        }}
        text2Style={{
          fontSize: 14,
          fontFamily: fonts.semiBold,
          color: color.white,
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };
   
  return (
    <LoaderContext.Provider value={loaderContext}>
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
    <Toast config={toastConfig} />
    </LoaderContext.Provider>
  );
};
export default App;
