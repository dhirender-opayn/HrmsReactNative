import React, { useContext } from "react";
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
import Toast from "react-native-toast-message";
import { AuthContext, LoaderContext, UserContext } from "../utils/context";

const ProfileView = ({navigation=useNavigation()}) => {
    const [userdata, setData] = useContext(UserContext);
    const [ListData, setListData] = useState([]);
    const { signOut } = useContext(AuthContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);

    const LogoutAPI = async() => {
        
        const request = new Request(Global.projct.ios.BASE_URL+Global.projct.apiSuffix.logout, {method: 'POST', headers: {
            Accept: 'application/json',
            Authorization: 'Bearer '+userdata.token,
        }});
        try{
            const response = await fetch(request)
            const json = await response.json();
            console.log(json);
            signOut();
            
        } 
        catch (error) {
            console.error(error);
            Toast.show({type: "error", text1: error});
        } 
        finally {
            hideLoader();
        }
    };

    const setViewData = async() => {
        const listing = [{id:  0, title: "Change Password", view: "ChangePassword"}, 
                        {id:  1, title: "Notification", view: "Notifications"}, 
                        {id:  2, title: "Add Ticket", view: "AddTicket"}];
        setListData(listing);
       
    };

    useEffect(() =>{ 
        setViewData();
    }, []);

    return(
        <OverlayContainer>
            <AppBackgorund />
            <View style={{padding: 16, flex: 1}}>
                {/* <Text>{deail}</Text> */}
                <View style={{flex: 1}}>
                   <View style={{flex: 1}}>
                        <View style={{flexDirection: "row", marginTop: 4, left: 0, right: 0, flex: 1}}>
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
                                <Text style={[CustomStyling.title, {padding: 8, alignSelf: 'flex-start'}]}>{userdata.user.name}</Text>
                                <Text style={[CustomStyling.subTitle, {alignSelf: 'flex-start', paddingHorizontal: 8}]}>{userdata.user.roles[0].name}</Text>
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
                            if (userdata.user.id == 1){
                                showLoader();
                                LogoutAPI();
                            }
                        }}
                        style={{height: 72, width: 80, alignSelf: "center",  marginTop: 20, marginBottom: 8}}>
                            <View style={{backgroundColor: Colors.color.white, borderRadius: 16, height: 72, width: 80, alignItems: "center", justifyContent: "center"}}>
                            <Image source={require("../images/EmergencyOff.png")}
                                style={{height:32, width:32, tintColor: Colors.color.backgroundBlack}}
                            />
                            </View>
                        </TouchableOpacity>
                        <Text style={[AuthStyle.mainButtonText, {marginBottom: 16}]}>{(userdata.user.id == 1) ? "Logout" : "Emergency Leave"}</Text>
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
                                    <Text style={[CustomStyling.listTitle, {flex: 7, height: 18}]}>{item.title}</Text>
                                    <Image source={require("../images/rightArrow.png")}
                                    style={CustomStyling.rightArrowImg} 
                                    />
                                </View>
                                </TouchableOpacity>
                            )}
                            style={{marginTop: 24}}
                        />
                        
                        {(userdata.user.id != 1) ? <TouchableOpacity 
                            onPress={() => {
                                showLoader();
                                LogoutAPI();
                            }}
                            style={{marginTop: 16, marginHorizontal: 16}}
                        >
                        <View style={{backgroundColor:Colors.color.red, borderRadius: 12, height: 50, justifyContent: "center", alignItems: "center", marginVertical: 12}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: '#fff'}}>Logout</Text>
                        </View>
                        </TouchableOpacity> : null}
                    </View>
                </View>
            
            </View>
        </OverlayContainer>
    );
};

export default ProfileView;