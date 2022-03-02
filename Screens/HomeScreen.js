import React from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ViewBase } from "react-native";
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
import Colors, { color } from "../Common/Colors";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import GeoLocationScreen from "./GeoLocationScreen";


const HomeScreen = ({ navigation = useNavigation() }) => {
   const [data, setData] = useState({});
   const [isLoad, setLoad] = useState(true)
   const [latnow, longnow ] =  useState();
   var detail = "";
   let subPosition = "";
   let topdatalist = [
      { key: strings.checkin, imagepath: ImagesPath.checkInImage }, { key: strings.checkout, imagepath: ImagesPath.checkOutImage }, { key: strings.qr_code_scanner, imagepath: ImagesPath.barCodeScanner }
   ];
   let bottomdatalist = [
      { key: strings.leave, imagepath: ImagesPath.leaveImage },
      { key: strings.attendance_list, imagepath: ImagesPath.attendanceListImage },
      { key: strings.calendar, imagepath: ImagesPath.calendarImage },
      { key: strings.request_leave, imagepath: ImagesPath.requestLeaveImage },
      { key: strings.announcement, imagepath: ImagesPath.announcementImage },
      { key: strings.work_history, imagepath: ImagesPath.workHistoryImage },
   ]
   const retrieveData = async () => {
      try {
         detail = await AsyncStorage.getItem('userData');
         console.log(detail);
         setData(JSON.parse(detail));
         console.log("=====>  ", data);
         // data.user.roles.forEach(element => {
         //    console.log(element)
         // });
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
   const singlePress = (selectedData) => {
      console.log("selectedData " , selectedData)
      if(selectedData.key.match(strings.calendar)){
           navigation.navigate('CalendarScreen')
      } else if(selectedData.key.match(strings.request_leave)){
         navigation.navigate('RequestLeaveScreen')
      }
      if (selectedData.key.match(strings.checkin)) {
         setFullIsLoad(true)
         InOutClick = "IN";
         
      }
      if(selectedData.key.match(strings.checkout)){
         setFullIsLoad(true)
         InOutClick = "OUT";
         
      }
      if(calculateDistance()<=30){
         
         AttendenceApi();
      } else {
         alert("You Are Distance 6 : ",calculateDistance());
      }
   

   }
   return (
      <OverlayContainer>
         <AppBackgorund />
         <View style={{flex: 1}}>
            <Image style={[CustomStyling.imageThumb, {marginTop: 32}]} source={ImagesPath.userwhiteUrl} />
            <View style={{ marginTop: 10 }}>
               {
                  isLoad ? <ActivityIndicator /> : (<Text style={CustomStyling.title} >{ data.user.name}</Text>)
               }
            </View>
            <View style={{ marginTop: 10 }}>
               {
                  isLoad ? <ActivityIndicator /> : (<Text style={CustomStyling.subTitle} >{data.user.roles.map(roledata => { return roledata.name})}</Text>)
               }
            </View>
            <GeoLocationScreen latnow = {latnow} />
            <FlatList
               // horizontal
               // showsHorizontalScrollIndicator={false}
               numColumns={3}
               data={topdatalist}
               renderItem={({ item }) =>
                 // <View>
                     <View style={homeStyle.homeCardContainer}>
                        <Image style={homeStyle.homeCardImg} source={item.imagepath} />
                        <Text style={homeStyle.homeCardText}> {item.key}</Text>
                     </View>
                  //</View>
               }
            />
            <View style={{  padding: 8, marginTop: 10}}>
               <FlatList
                  //showsHorizontalScrollIndicator={false}
                  data={bottomdatalist}
                  numColumns={3}
                  renderItem={({ item }) =>
                  <TouchableOpacity onPress={() =>singlePress(item)} style={{ width: "33.3%"}}>
                     
                        <View style={homeStyle.homeCardContainerbottom}>
                              <Image style={homeStyle.homeCardImg} source={item.imagepath} />
                              <Text style={homeStyle.homeCardTextbottom}> {item.key}</Text>
                        </View>
                    
                     </TouchableOpacity>
                  }
               />
            </View>
         </View>
      </OverlayContainer>
   );
};
const homeStyle = StyleSheet.create({
   homeCardContainer: {
      marginTop: 35,
      marginBottom: 8,
      marginStart:10,
      width: "30%",
      backgroundColor: color.white,
      borderRadius: 12,
      alignContent: 'center',
      paddingVertical: 15,
      //paddingHorizontal: 33,
      shadowColor: Colors.color.darkGray,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 3,
   },
   homeCardImg: {
      height: 45,
      width: 45,
      alignSelf: 'center',
   },
   homeCardText: {
      width: 60,
      height: 25,
      fontSize: 11,
      textAlign:'center',
      color: 'black',
      alignSelf: 'center',
      fontWeight: '600',
      color: Colors.color.gray,
      marginTop: 10,
   },
   homeTitle: {
      marginBottom: 30,
      fontSize: 25,
      color: "#fff",
      textAlign: 'center',
      fontWeight: '700'
   },
   homeCardContainerbottom: {
      marginTop: 10,
      marginBottom:4,
      marginHorizontal: 10,
      alignSelf: "center",
      width: '90%',
      backgroundColor: color.white,
      borderRadius: 12,
      paddingTop: 15,
      paddingBottom: 5,
      //paddingHorizontal: 20,
      shadowColor: Colors.color.darkGray,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 3,
   },
   homeCardImgBottom: {
      height: 40,
      width: 40,
      alignSelf: 'center',
   },
   homeCardTextbottom: {
      width: 60,
      height: 25,
      fontSize: 10,
      color: 'black',
      alignSelf: 'center',
      fontWeight: 'bold',
      color: Colors.color.gray,
      marginTop: 10,
      textAlign: "center"
   },
});
export default HomeScreen;
