import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { OverlayContainer } from "../Common/OverlayContainer";
import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
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
import AttendanceFilterModal from "./AttendanceFilter";
import ImagesPath from "../images/ImagesPath";
import fonts from "../Common/fonts";

const AttendanceList = ({navigation=useNavigation(), route}) => {
    const [attendanceData, setAttendanceData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [listPage, setListPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const toast = useToast();
    const [params, setParams] = useState({type: "", startDate: "", endDate: ""});
    const { showLoader, hideLoader } = useContext(LoaderContext);

        const getAttendanceData = async(pageNum, params) => {
            console.log(params);
            var urlEndPoint = apiEndPoints.AttendanceList+"?page="+pageNum;
            if (params.type != ""){
                urlEndPoint += "&type="+params.type.toLowerCase();
            }
            if (params.startDate != ""){
                urlEndPoint += "&start_date="+params.startDate+"&end_date="+params.endDate;
            }
            console.log(urlEndPoint);
            try {
                    const {data} = await apiCall("GET", urlEndPoint);
                    // console.log(data);
                    if (pageNum == 1){
                        setAttendanceData(data.data);
                    }else{
                        let newData = {...attendanceData};
                        newData["data"] = [...newData.data, ...data.data.data];
                        setAttendanceData(newData);
                        console.log(newData);
                    }
                } catch (error) {
                    console.error(error);
                    toast.show(error, { duration: 3000 })
                } finally {
                    setLoading(false);
                    setRefreshing(false);
                    hideLoader();
                }
        };

        const onRefresh = React.useCallback(() => {
            setRefreshing(true);
            let newParam = {type: "", startDate: "", endDate: ""}
            setParams(newParam)
            getAttendanceData(1, newParam);
          }, []);

        useEffect(() => {
            showLoader();
            getAttendanceData(listPage, params);
        }, []);
    
        React.useLayoutEffect(() => {
            navigation.setOptions({
              headerRight: () => 
            //   <Button onPress={() => setShowFilter(true)} title="change" />
            <TouchableOpacity onPress={() => setShowFilter(true)}>
              <Image onPress={() => {setShowFilter(true); toast.show("Pressed");}} source={ImagesPath.filterImg} style={{width: 20, height: 20, tintColor: color.white}}/>
              </TouchableOpacity>
              ,
            });
          }, [navigation]);

    return(
        <OverlayContainer>
            <AppBackgorund />
                { isLoading ? <ActivityIndicator /> :
                    <View>
                    <FlatList 
                            data={attendanceData.data}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item}) => ( <View style = {CustomStyling.cardStyle}>
                                    <View style={{ flexDirection: "row", margin: 8}}>
                                        <Text style={CustomStyling.attendanceLabel}>Date</Text>
                                        <Text style={[CustomStyling.attendanceLabel, {textAlign: "right"}]}>{moment.utc(item.timing).local().format("DD MMM, YYYY")}</Text>
                                    </View>
                                    <View style={CustomStyling.seperatorStyle}>
                                    </View>
                                    <View style={{flexDirection: "row", margin: 8}}>
                                        <Text style={CustomStyling.attendanceLabel}>{(item.type == "IN") ? "Check in" : "Checkt out"}</Text>
                                        <Text style={[CustomStyling.attendanceLabel, {textAlign: "right", color: (item.type == "IN") ? color.green : color.darkRed}]}>{moment.utc(item.timing).format("hh: mm a")}</Text>
                                    </View>
                                </View>)
                            }
                            onEndReached={() => {
                                if (listPage < attendanceData.last_page){
                                    setListPage(listPage+1);
                                    getAttendanceData(listPage+1, params);
                                }
                            }}
                            onEndReachedThreshold ={0.1}
                            refreshControl = {
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                            }
                     />
                     {(showFilter) ? <AttendanceFilterModal onPressSubmit={(type, startDate, endDate) => {
                         setShowFilter(false);
                         setListPage(1);
                         let newParams = {type: type, startDate: startDate, endDate: endDate};
                         setParams(newParams)
                         getAttendanceData(1, newParams);
                     }}/> : null}
                     </View>
                } 
                        
                   
        </OverlayContainer>
    );
};

export default AttendanceList;
