import React from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { OtpVerify } from "./OtpVerify";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import String, { strings } from "../Common/String";
import ImagesPath from "../images/ImagesPath";
import { userwhiteUrl } from "../images/ImagesPath";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { AuthStyle } from "../CustomStyle/AuthStyle";



const HomeScreen = ({ navigation = useNavigation() }) => {
   const [data, setData] = useState({});
   const [isLoad, setLoad] = useState(true)
   var detail = "";

   const retrieveData = async () => {
      try {
         detail = await AsyncStorage.getItem('userData');
         console.log(detail);
         setData(JSON.parse(detail));
         console.log("=====>  ", data);
      }
      catch (error) {
         console.error(error);
      }
      finally {
         setLoad(false);
      }
   };
   useEffect(() => {
      retrieveData();
   }, []);

   return (

      <OverlayContainer>
         <AppBackgorund />
         <View>
            <Text style={{ marginBottom: 30, fontSize: 30, color: "#fff", textAlign: 'center' }}>{strings.home}</Text>
            <Image style={CustomStyling.imageThumb} source={require('../images/userwhite.png')} />
            <View style={{ marginTop: 40 }}>
               {
                  isLoad ? <ActivityIndicator /> : (<Text style={CustomStyling.title} >{data.user.name}</Text>)
               }
            </View>
            <View style={{ marginTop: 10 }}>
               {
                  isLoad ? <ActivityIndicator /> : (<Text style={CustomStyling.subTitle} >{data.user.name}</Text>)
               }
            </View>

         </View>
      </OverlayContainer>
   );

};
export default HomeScreen;