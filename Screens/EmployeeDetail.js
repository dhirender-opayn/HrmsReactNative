import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { OverlayContainer } from "../Common/OverlayContainer";
import { View, Image, Text, ActivityIndicator, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import AppBackgorund from "./BackgroundView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomStyling } from "../CustomStyle/CustomStyling";
import  Colors, { color }  from "../Common/Colors";
import { useNavigation } from "@react-navigation/native";
import Global from "../Common/Global";
import { useToast } from "react-native-toast-notifications";
import { AuthContext, UserContext } from "../utils/context";
import { apiCall } from "../utils/httpClient";
import apiEndPoints from "../utils/apiEndPoints";
import { StyleSheet } from "react-native";

const EmployeeDetail = ({navigation=useNavigation(), route}) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setLoading] = useState(true)
   
   
    const toast = useToast();
       
        const getTeamData = async() => {
            try {
                    const {data} = await apiCall("GET", apiEndPoints.Team+"?user_id="+route.params.id);
                    console.log(data);
                    setUserData(data.data);
                } catch (error) {
                    console.error(error);
                    toast.show(error, { duration: 3000 })
                } finally {
                    setLoading(false);
                }
        };

        useEffect(() => {
            getTeamData();
        }, []);
    
    return(
        <OverlayContainer>
            <AppBackgorund />
            <View style={{padding: 16, flex: 1}}>
                { isLoading ? <ActivityIndicator /> :
               ( <View style={{}}>
                   <View style={{}}>
                        <View style={{flexDirection: "row", marginTop: 24, left: 0, right: 0}}>
                            {(userData.profile.image != null) ? 
                                (<Image 
                                source={{
                                    uri: userData.profile.image,
                                    method: 'GET'
                                }}
                                style={empStyle.imageStyle}
                                />)
                                :
                                (<Image 
                                source={require('../images/userwhite.png')}
                                style={empStyle.imageStyle}
                                />)
                            }
                            <View style={{paddingHorizontal: 4, paddingVertical: 0, justifyContent: "center", marginLeft: 8}}>
                                <Text style={{numberOfLines: 2, fontSize: 18, color: 'white', paddingVertical: 8}}>{userData.name}</Text>
                                <Text style={{numberOfLines: 2, fontSize: 16, color: 'white', paddingVertical:4}}>{userData.roles[0].name}</Text>
                            </View>
                        </View>
                        <View style = {{marginTop: 24}}>
                            <Text style = {{color: color.white, fontSize: 16}}>Basic Information</Text>
                            <View style = {empStyle.cardStyle}>
                                <View style={{ flexDirection: "row", margin: 8}}>
                                    <Text style={{fontSize: 18, width: '50%'}}>Designation</Text>
                                    <Text style={{fontSize: 18, width: '50%', textAlign: "right"}}>{userData.roles[0].name}</Text>
                                </View>
                                <View style={empStyle.seperatorStyle}>
                                </View>
                                <View style={{flexDirection: "row", margin: 8}}>
                                    <Text style={{fontSize: 18, width: '50%'}}>Company</Text>
                                    <Text style={{fontSize: 18, width: '50%', textAlign: "right"}}>Opayn llc.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: "flex-end", marginVertical: 16}}>
                        {/* <FlatList 
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
                         */}
                    </View>
                </View>
                )}
            </View>
        </OverlayContainer>
    );
};

export default EmployeeDetail;

const empStyle = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 0,
        marginVertical: 12,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.lightGray,
        backgroundColor: color.white,
    },
    statusStyle: {
        //height: 32,
        borderRadius: 16,
        backgroundColor: color.red,
        paddingHorizontal: 8,
        paddingVertical: 6,
        alignSelf: "flex-end",
        flexDirection: 'row'
    },
    imageStyle: {
        height: 70,
        width: 70,
        borderRadius: 8,
        //resizeMode: "contain"

    },
    seperatorStyle: {
        height: 1,
        backgroundColor: color.lightGray,
        marginHorizontal: 8,
        marginVertical: 4
    }
});
