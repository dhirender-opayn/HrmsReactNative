import React, { useContext, useState, useEffect } from "react";
import { OverlayContainer } from "../Common/OverlayContainer";
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import AppBackgorund from "./BackgroundView";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import  Colors, { color }  from "../Common/Colors";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { LoaderContext } from "../utils/context";
import { apiCall } from "../utils/httpClient";
import apiEndPoints from "../utils/apiEndPoints";
import moment from 'moment';
import fonts from "../Common/fonts";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const EmployeeDetail = ({navigation=useNavigation(), route}) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [showAttendance, setShowAttend] = useState(true);
    const LeaveSummary = [{id: 1, count: 18, type: "Casual Leave"}, {id: 2, count: 18, type: "Casual Leave"}, {id: 3, count: 18, type: "Casual Leave"}]
    const leaveTypes = [{value: "Single Day", id: 1}, {value: "Multiple Day", id: 2}, {value: "Short Leave", id: 4},
         {value: "First Half", id: 5}, {value: "Second Half", id: 6}, {value: "", id: 0}, {value: "", id: 3}];
    const leaveStatus = [{value: "Pending", id: 0}, {value: "Approved", id: 1}, {value: "Rejected", id: 2}];
    const { showLoader, hideLoader } = useContext(LoaderContext);
   
    const toast = useToast();
       
        const getTeamData = async() => {
            try {
                    const {data} = await apiCall("GET", apiEndPoints.Team+"?user_id="+route.params.id);
                    setUserData(data.data);
                } catch (error) {
                    toast.show(error, { duration: 3000 })
                } finally {
                    setLoading(false);
                    hideLoader();
                }
        };

        const leaveDate = (data) => {
            var dateStr = ""
            if(data.leave_type == 2){
                dateStr = moment(new Date(data.start_date)).format("DD MMM, YYYY");
                dateStr += " - ";
                dateStr += moment(new Date(data.end_date)).format("DD MMM, YYYY");
            }
            else if (data.leave_type == 4){
                dateStr = moment(new Date(data.start_date)).format("DD MMM, YYYY");
                dateStr += " (";
                dateStr += moment.utc(data.start_date).local().format("HH:mm");
                dateStr += " - ";
                dateStr += moment.utc(data.end_date).local().format("HH:mm") + ")";
            }
            else{
                dateStr = moment(new Date(data.start_date)).format("DD MMM, YYYY");
            }
            return dateStr;
        };

        useEffect(() => {
            setLoading(true);
            getTeamData();
        }, []);
    
    return(
        <OverlayContainer>
            <AppBackgorund />
            <View style={{padding: 16}}>
                { isLoading ? <SkeletonPlaceholder speed={700} backgroundColor={color.skeletonGray}>
            
                    <View style={{height: '100%'}}>
                        <View style={[{ flexDirection: "row", alignItems: "center", marginVertical: 8, padding: 8}]}>
                            <View >
                                <View style={empStyle.imageStyle} />
                            </View>
                            <View style={{ marginLeft: 8, }}>
                                <View style={{ width: 120, height: 16, borderRadius: 4, alignSelf: "flex-end" }} />
                                <View
                                style={{ marginTop: 6, width: 80, height: 16, borderRadius: 4 }}
                                />
                            </View>
                        </View>
                        <View style={{ width: 120, height: 16, borderRadius: 4}} />
                        {[...Array(10)].map((elementInArray, index) => ( 
                            <View style={[{ flexDirection: "row", alignItems: "center", marginVertical: 8,
                                padding: 8,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: color.lightGray, }]}>
                
                                <View style={{ marginLeft: 4, width: "50%" }}>
                                    <View style={{ width: 120, height: 16, borderRadius: 4 }} />
                                    <View
                                    style={{ marginTop: 6, width: 80, height: 16, borderRadius: 4 }}
                                    />
                                </View>
                                <View style={{ marginRight: 8, width: "50%", alignItems: "flex-end" }}>
                                    <View style={{ width: 120, height: 16, borderRadius: 4, alignSelf: "flex-end" }} />
                                    <View
                                    style={{ marginTop: 6, width: 80, height: 16, borderRadius: 4 }}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </SkeletonPlaceholder> :
                (<ScrollView style={{}}>
                   <View style={{}}>
                        <View style={{flexDirection: "row", marginTop: 8, left: 0, right: 0}}>
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
                                <Text style={[CustomStyling.title, {paddingVertical: 8}]} numberOfLines={2}>{userData.name}</Text>
                                <Text style={[CustomStyling.subTitle, {paddingVertical:4, alignSelf: "flex-start"}]} numberOfLines={2}>{userData.roles[0].name}</Text>
                            </View>
                        </View>
                        <View style = {{marginTop: 24}}>
                            <Text style = {[CustomStyling.subTitle, {alignSelf: "flex-start"}]}>Basic Information</Text>
                            <View style = {[CustomStyling.cardStyle, {marginTop: 12, marginHorizontal: 0}]}>
                                <View style={{ flexDirection: "row", margin: 8}}>
                                    <Text style={CustomStyling.detailLabel}>Designation</Text>
                                    <Text style={[CustomStyling.detailLabel, {textAlign: "right"}]}>{userData.roles[0].name}</Text>
                                </View>
                                <View style={CustomStyling.seperatorStyle}>
                                </View>
                                <View style={{flexDirection: "row", margin: 8}}>
                                    <Text style={CustomStyling.detailLabel}>Company</Text>
                                    <Text style={[CustomStyling.detailLabel, {textAlign: "right"}]}>Opayn llc.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={empStyle.HalfLeaveView}>
                                <TouchableOpacity onPress={() => {setShowAttend(true)}}  style={[
                                    (showAttendance) ? empStyle.SelectedHalfView : empStyle.UnselectedHalfView, 
                                    {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}
                                ]}>
                                    <Text style={(showAttendance) ? empStyle.selectedText : empStyle.UnselectedText}>Attendance</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setShowAttend(false)}  style={[
                                    (!showAttendance) ? empStyle.SelectedHalfView : empStyle.UnselectedHalfView,
                                    {borderTopRightRadius: 0, borderBottomRightRadius: 0}
                                ]}>
                                    <Text style={(!showAttendance) ? empStyle.selectedText : empStyle.UnselectedText}>Leaves</Text>
                                </TouchableOpacity>
                            </View>
                    {/* <View style={{  marginVertical: 4}}>
                        <FlatList 
                            data={showAttendance ? userData.attandances : userData.leaves}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item}) => ( showAttendance ? */}
                                {(showAttendance) ? userData.attandances.map((item, index) => {
                                return (<View style = {[CustomStyling.cardStyle, {marginHorizontal: 0}]}>
                                    <View style={{ flexDirection: "row", margin: 8}}>
                                        <Text style={CustomStyling.attendanceLabel}>Date</Text>
                                        <Text style={[CustomStyling.attendanceLabel, {textAlign: "right"}]}>{moment.utc(item.timing).local().format("DD MMM, YYYY")}</Text>
                                    </View>
                                    <View style={CustomStyling.seperatorStyle}>
                                    </View>
                                    <View style={{flexDirection: "row", margin: 8}}>
                                        <Text style={CustomStyling.attendanceLabel}>{item.type}</Text>
                                        <Text style={[CustomStyling.attendanceLabel, {textAlign: "right", color: (item.type == "IN") ? color.green : color.darkRed}]}>{moment.utc(item.timing).format("hh: mm a")}</Text>
                                    </View>
                                </View>);
                            }) : userData.leaves.map((item, index) => {
                                    return (<View style={[CustomStyling.cardStyle, {marginHorizontal: 0}]}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flex: 2, flexDirection: 'column'}}>
                                            <Text style={{fontSize: 16, fontFamily: fonts.semiBold}}>{userData.name}</Text>
                                            <Text style={{fontSize: 14, fontFamily: fonts.semiBold, marginTop: 4}}>{leaveTypes.find(type => type.id == item.leave_type).value}</Text>
                                        </View>
                                        <View style={{flex: 1}}>
                                        <View style={[CustomStyling.statusStyle, {backgroundColor: (item.status == 0) ? color.yellow : (item.status == 1) ?  color.green : color.darkRed}]}>
                                            <Image source={require("../images/clock.png")}
                                                style={{height: 16, width: 16, tintColor: Colors.color.white, resizeMode: "contain"}} 
                                            />
                                            <Text style={{fontSize: 14, fontFamily: fonts.semiBold, color: color.white, marginLeft: 4}}>{leaveStatus.find(status => status.id == item.status).value}</Text>
                                        </View>
                                        </View>
                                    </View>
                                    <View style={{marginLeft: 8}}>
                                        <View style={{flex: 1, flexDirection: 'row', marginVertical: 8}}>
                                            <Image source={require("../images/calendar.png")}
                                                style={{height: 16, width: 16, tintColor: Colors.color.black, resizeMode: "contain"}} 
                                            />
                                            <Text style={{fontSize: 14, fontFamily: fonts.medium, color:color.backgroundBlack, marginLeft: 6}}>Date: </Text>
                                            <Text style={{fontSize: 14, fontFamily: fonts.medium}}>{leaveDate(item)}</Text>
                                        </View>
                                        <Text style={{fontSize: 16, fontFamily: fonts.medium, color:color.backgroundBlack}}>{item.reason}</Text>
                                    </View>
                                </View>)
                                })}
                        {/* //     )}
                        // /> */}
                        
                    {/* </View> */}
                </ScrollView>
                )}
            </View>
        </OverlayContainer>
    );
};

export default EmployeeDetail;

const empStyle = StyleSheet.create({
    
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 8,
        //resizeMode: "contain"

    },
    HalfLeaveView: {
        marginTop: 12,
        // flex: 1,
        width: '100%',
        flexDirection: "row",
    },
    SelectedHalfView: {
        backgroundColor: color.titleBlack,
        borderWidth: 1,
        borderColor: Colors.color.lightGray,
        // flex: 1,
        width: '50%',
        height: 60,
        justifyContent: "center",
    },
    UnselectedHalfView: {
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: Colors.color.lightGray,
        // flex: 1,
        width: '50%',
        height: 60,
        justifyContent: "center"
    },
    selectedText: {
        fontSize: 16,
        fontFamily: fonts.bold,
        textAlign: "center",
        color: color.white,
    },
    UnselectedText: {
        fontSize: 16,
        textAlign: "center",
        color: color.black,
        fontFamily: fonts.bold,
    },
});
