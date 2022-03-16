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
import { AuthContext, LoaderContext, UserContext } from "../utils/context";
import { apiCall } from "../utils/httpClient";
import apiEndPoints from "../utils/apiEndPoints";
import { StyleSheet } from "react-native";
import moment from 'moment';
import fonts from "../Common/fonts";
 import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const WorkHistory = ({navigation=useNavigation(), route}) => {
    const [clockifyData, setClockifyData] = useState([]);

    const { showLoader, hideLoader } = useContext(LoaderContext);
    const [isLoading, setLoading] = useState(true);
    const toast = useToast();
       
        const getlockifyData = async() => {
            try {
                    const {data} = await apiCall("GET", apiEndPoints.GetClockifyData);
                    if (data.hasOwnProperty("data")){
                        setClockifyData(data.data);
                    }
                    else{
                        
                        toast.show(data.message, {duration: 3000})
                    }
                    
                } catch (error) {
                    toast.show(error, { duration: 3000 })
                } finally {
                    setLoading(false);
                    hideLoader();
                }
        };

        useEffect(() => {
            setLoading(true);
            getlockifyData();
        }, []);
    
    return(
        <OverlayContainer>
            <AppBackgorund />
                
            { isLoading ?

                <SkeletonPlaceholder speed={700} backgroundColor={color.skeletonGray}>
                    <View style={{height: '100%'}}>
                    {[...Array(10)].map((elementInArray, index) => ( 
                    <View style={[{ flexDirection: "column", marginHorizontal: 16, marginVertical: 8,
                    padding: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: color.lightGray}]}>

                        <View style={{flexDirection: "row", width: '100%'}}>
                            <View  style={{ width: 60, height: 16, borderRadius: 4 }}/>
                            <View style={{width: '80%'}}>
                                <View  style={{  height: 16, borderRadius: 4, marginLeft: 4, width: '100%' }} />
                            </View>
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", marginTop: 8}}>
                            <View  style={{ width: 20, height: 16, borderRadius: 4 }}/>
                            <View style={{width: '90%'}}>
                                <View  style={{  height: 16, borderRadius: 4, marginLeft: 4, width: '50%' }} />
                            </View>
                        </View>
                    </View>
                    ))}
                    </View>
                </SkeletonPlaceholder> :
                <View>
                 {(clockifyData.length != null && clockifyData.length != 0) ?
                    <FlatList 
                            data={clockifyData}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item}) => ( <View style = {CustomStyling.cardStyle}>
                                    <View style={{ flexDirection: "row", margin: 8, paddingEnd: 44}}>
                                        <Image source={require("../images/clockify.png")}
                                            style={{height: 14, width: 50, marginTop: 4, resizeMode: "contain"}} 
                                        />
                                        <Text style={[CustomStyling.workTextStyle]}>{item.description}</Text>
                                    </View>

                                    <View style={{flexDirection: "row", margin: 8}}>
                                        <Image source={require("../images/clock.png")}
                                                    style={{height: 15, width: 15, }} 
                                                />        
                                        <Text style={[CustomStyling.workTextStyle, {fontFamily: fonts.regular, fontSize: 14}]}>
                                            {moment.utc(item.timeInterval.start).local().format("DD MMM, YYYY hh:mma")} - 
                                            {(item.timeInterval.end != null) ? moment.utc(item.timeInterval.end).local().format("hh:mma") : ""}
                                        </Text>
                                    </View>
                                </View>)
                            }
                            onEndReached={() => {
                                if (listPage < attendanceData.last_page){
                                    setListPage(listPage+1);
                                    getAttendanceData(listPage+1);
                                }
                            }}
                            onEndReachedThreshold ={0.1}
                    /> :
                    <Text style={CustomStyling.NoDataLabel}>No Data Found</Text>}
                    </View>
            }
                   
        </OverlayContainer>
    );
};

export default WorkHistory;
