import React from "react";
import { useState, useEffect } from "react";
import { OverlayContainer } from "../Common/OverlayContainer";
import { View, Image, Text, ActivityIndicator, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import AppBackgorund from "./BackgroundView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomStyling } from "../CustomStyle/CustomStyling";
import  Colors  from "../Common/Colors";
import { useNavigation } from "@react-navigation/native";
import Global from "../Common/Global";
import { useToast } from "react-native-toast-notifications";

const ProfileView = ({navigation=useNavigation()}) => {
    const [userdata, setData] = useState({});
    const [isLoad, setLoad] = useState(true)
    const [ListData, setListData] = useState([]);
    const [message, setMsg] = useState("");
    const [isLoading, setLoading] = useState(false);
    var detail =  "";
    const [deail, setDetail] = useState("");
    const toast = useToast();
    const LogoutAPI = async() => {
        
        const request = new Request(Global.projct.ios.BASE_URL+Global.projct.apiSuffix.LogoutAPI, {method: 'POST', headers: {
          Accept: 'application/json',
          Authorization: 'Bearer '+userdata.token,
          }});
          try{
              const response = await fetch(request)
              const json = await response.json();
              setMsg(json.message);  
              //toast.show(json.message, {duration: 4000});
              navigation.navigate("Login");
          } catch (error) {
          console.error(error);
          toast.show(error, {duration: 3000})
          } finally {
          setLoading(false);
          }
      };
    const retrieveData = async() => {
        try{
            detail =  await AsyncStorage.getItem('userData');
            console.log(detail);
            setDetail(detail)
            setData(JSON.parse(detail));
            const listing = [{id:  0, title: "Change Password", view: "ChangePassword"}, 
                        {id:  0, title: "Notification", view: ""}, 
                        {id:  2, title: "Add Ticket", view: "AddTicket"}];
            setListData(listing);
        }
        catch (error){
            console.error(error);
        }
        finally{
            setLoad(false);
        }
    };
    useEffect(() =>{ 
        retrieveData();
    }, []);
    return(
        <OverlayContainer>
            <AppBackgorund />
            <View style={{padding: 16, flex: 1}}>
                {/* <Text>{deail}</Text> */}
                { isLoad ? <ActivityIndicator /> :
               ( <View style={{flex: 1}}>
                   <View style={{flex: 1}}>
                        <View style={{flexDirection: "row", marginTop: 24, left: 0, right: 0, flex: 1}}>
                            {(userdata.user.profile.image != null) ? 
                                (<Image 
                                source={{
                                    uri: userdata.user.profile.image,
                                    method: 'GET'
                                }}
                                style={{width:80, height: 80, borderRadius: 40}}
                                />)
                                :
                                (<Image 
                                source={require('../images/userwhite.png')}
                                style={{width:80, height: 80, borderRadius: 40}}
                                />)
                            }
                            <View style={{paddingHorizontal: 4, paddingVertical: 8, flex: 3}}>
                                <Text style={CustomStyling.UserNameText}>{userdata.user.name}</Text>
                                <Text style={CustomStyling.userDesignationText}>{userdata.user.roles[0].name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('EditProfile');
                            }}
                            style={{height: 32, flex: 1,  marginTop: 16, marginEnd: 8}}>
                                <Image source={require("../images/editSquare.png")}
                                    style={{height:32, width:32, tintColor: "white", alignSelf: "flex-end"}}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => {

                        }}
                        style={{height: 72, width: 80, alignSelf: "center",  marginTop: 20, marginEnd: 8}}>
                            <View style={{backgroundColor: Colors.color.red, borderRadius: 16, height: 72, width: 80, alignItems: "center", justifyContent: "center"}}>
                            <Image source={require("../images/EmergencyOff.png")}
                                style={{height:32, width:32, tintColor: "white"}}
                            />
                            </View>
                        </TouchableOpacity>
                        <Text style={[CustomStyling.title, {marginBottom: 16}]}>Emergency Leave</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: "flex-end", marginVertical: 16}}>
                        <FlatList 
                            data={ListData}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => 
                                    navigation.navigate(item.view)
                                }>
                                <View style={{ flexDirection: "row", borderBottomWidth: (item.id == ListData.length-1) ? 0 : 1, borderBottomColor: Colors.color.lightGray, paddingTop: 16, paddingBottom: 8, justifyContent: "center"}}>
                                    <Text style={[CustomStyling.listTitle, {flex: 7, height: 20}]}>{item.title}</Text>
                                    <Image source={require("../images/rightArrow.png")}
                                    style={{height: 20, width: 16, flex: 1, tintColor: Colors.color.lightGray, resizeMode: "contain"}} 
                                    />
                                </View>
                                </TouchableOpacity>
                            )}
                            style={{marginTop: 24}}
                        />
                        
                        <TouchableOpacity 
                            onPress={() => {
                                setLoading(true);
                                LogoutAPI();
                            }}
                            style={{marginTop: 16, marginHorizontal: 16}}
                        >
                        <View style={{backgroundColor:Colors.color.red, borderRadius: 12, height: 50, justifyContent: "center", alignItems: "center", marginVertical: 12}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: '#fff'}}>Logout</Text>
                            {isLoading ? <ActivityIndicator /> : null}
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
            </View>
        </OverlayContainer>
    );
};

export default ProfileView;