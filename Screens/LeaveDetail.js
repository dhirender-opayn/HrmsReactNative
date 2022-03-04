import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";
import Colors, { color } from "../Common/Colors";
import { OverlayContainer } from "../Common/OverlayContainer";
import apiEndPoints from "../utils/apiEndPoints";
import { UserContext } from "../utils/context";
import { apiCall } from "../utils/httpClient";
import AppBackgorund from "./BackgroundView";
import moment from 'moment';
import { StyleSheet } from "react-native";
import { types } from "@babel/core";


const LeaveDetail = ({navigation=useNavigation(), route}) => {
    const [userData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [item, setLeaveData] = useState({});
    const toast = useToast();
    const LeaveSummary = [{id: 1, count: 18, type: "Casual Leave"}, {id: 2, count: 18, type: "Casual Leave"}, {id: 3, count: 18, type: "Casual Leave"}]
    const leaveTypes = [{value: "Single Day", id: 1}, {value: "Multiple Day", id: 2}, {value: "Short Leave", id: 4},
         {value: "First Half", id: 5}, {value: "Second Half", id: 6}, {value: "", id: 0}, {value: "", id: 3}];
    const leaveStatus = [{value: "Pending", id: 0}, {value: "Approved", id: 1}, {value: "Rejected", id: 2}];

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

    const updateLeaveStatus = async(id, userid, status) => {
        try {
            const {data} = await apiCall("POST", apiEndPoints.UpdateLeaveStatus, {user_id: userid, id: id, status: status});
            console.log(data);
           if (data.hasOwnProperty("data")){
                console.log("Heloo");
                var leave = {...item};
                leave["status"] = status;
                console.log(leave);
                setLeaveData(leave);
           }
           toast.show(data.message, {duration: 3000});
        } catch (error) {
            console.error(error);
            toast.show(error, { duration: 3000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("hello");
        setLeaveData(route.params.data);
        console.log(route.params.data)
        setLoading(false);
    }, [])

    return(
        <OverlayContainer>
            <AppBackgorund />
            {/* <View>
                <Text>Hello</Text>
            </View> */}
            {isLoading ? <ActivityIndicator /> :
                <View style={leavStyle.cardStyle}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '60%', flexDirection: "row", marginTop: 12}}>
                        <Image source={require("../images/ticket.png")}
                                style={leavStyle.imageStyle} 
                            />
                        <Text style={[leavStyle.textStyle, {marginRight: 6}]} numberOfLines={1}>{item.reason}</Text>
                    </View>
                    <View style={{width: '35%', marginLeft: 16}}>
                    <View style={[leavStyle.statusStyle, {backgroundColor: (item.status == 0) ? color.yellow : (item.status == 1) ?  color.green : color.red}]}>
                        <Image source={require("../images/clock.png")}
                            style={{height: 24, width: 24, tintColor: Colors.color.white, resizeMode: "contain"}} 
                        />
                        <Text style={{fontSize: 18, fontWeight: '800', color: color.white, marginLeft: 4}}>{leaveStatus.find(status => status.id == item.status).value}</Text>
                    </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 16}}>
                        <Image source={require("../images/leaveType.png")}
                            style={leavStyle.imageStyle} 
                        />
                        <Text style={leavStyle.textStyle}>{leaveTypes.find(type => type.id == item.leave_type).value}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16}}>
                        <Image source={require("../images/calendarPink.png")}
                            style={leavStyle.imageStyle} 
                        />
                        <Text style={leavStyle.textStyle}>{leaveDate(item)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16}}>
                        <Image source={require("../images/personActive.png")}
                            style={leavStyle.imageStyle} 
                        />
                        <Text style={leavStyle.textStyle}>Manager: Pankaj Singh</Text>
                    </View>
                    <View style={{height: 1, backgroundColor: color.darkGray, marginTop: 8}}></View>
                    <Text style={[leavStyle.textStyle, {marginTop: 16}]}>{item.reason}</Text>
                </View>
                {(userData.user.id == 1 && item.status == 0) ? 
                    <View style = {{ flexDirection: "row", marginTop: 8}}>
                        <TouchableOpacity style={{ padding: 8, width: '50%'}} onPress={() => updateLeaveStatus(item.id, item.user_id, 2)}>
                            <View style={{borderWidth: 1, borderColor: color.darkGray, borderRadius: 4, justifyContent: "center", height: 32}}>
                                <Text style={{textAlign: "center", fontSize: 16, fontWeight: '600', color: color.darkGray}}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 8, width: '50%'}} onPress={() => updateLeaveStatus(item.id, item.user_id, 1)}>
                            <View style={{borderRadius: 4, backgroundColor: color.green, justifyContent: "center", height: 32}}>
                                <Text style={{textAlign: "center", fontSize: 16, fontWeight: '600', color: color.white}}>Approve</Text>
                            </View>
                        </TouchableOpacity>
                    </View> : null
                }
            </View>
            }
        </OverlayContainer>
    );
};

export default LeaveDetail;

const leavStyle = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 16,
        marginTop: 8,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.lightGray,
        backgroundColor: color.white,
        //flex: 6
    },
    statusStyle: {
       // height: 32,
        borderRadius: 24,
        backgroundColor: color.red,
        paddingHorizontal: 8,
        paddingVertical: 8,
        alignSelf: "center",
        flexDirection: 'row'
    },
    imageStyle: {height: 20, width: 20, resizeMode: "contain"},
    textStyle: {fontSize: 17, fontWeight: '500', color: color.darkGray, marginLeft: 8},
})