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


const LeavesRequestListing = ({navigation=useNavigation()}) => {
    const [userData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [LeavesData, setLeavesData] = useState([]);
    const toast = useToast();
    const LeaveSummary = [{id: 1, count: 18, type: "Casual Leave"}, {id: 2, count: 18, type: "Casual Leave"}, {id: 3, count: 18, type: "Casual Leave"}]
    const leaveTypes = [{value: "Single Day", id: 1}, {value: "Multiple Day", id: 2}, {value: "Short Leave", id: 4},
         {value: "First Half", id: 5}, {value: "Second Half", id: 6}, {value: "", id: 0}, {value: "", id: 3}];
    const leaveStatus = [{value: "Pending", id: 0}, {value: "Approved", id: 1}, {value: "Rejected", id: 2}];

    const getLeavesData = async() => {
        try {
                const {data} = await apiCall("GET", apiEndPoints.LeaveListing);
                console.log(data);
                setLeavesData(data.data);
            } catch (error) {
                console.error(error);
                toast.show(error, { duration: 3000 })
            } finally {
                setLoading(false);
            }
    }
    useEffect(() => {
        getLeavesData();
    }, []);

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

    const updateStatus = async(id, userid, status) => {
        try {
            const {data} = await apiCall("POST", apiEndPoints.UpdateLeaveStatus, {user_id: userid, id: id, status: status});
            console.log(data);
            console.log(data.hasOwnProperty("data"));
           if (data.hasOwnProperty("data")){
               console.log("Hello")
                var leaves = [...LeavesData];
                var index = leaves.findIndex(item => item.id == id);
                console.log(index);
                leaves[index].status = status;
                setLeavesData(leaves);
           }
           toast.show(data.message, {duration: 4000});
        } catch (error) {
            console.error(error);
            toast.show(error, { duration: 3000 })
        } finally {
            setLoading(false);
        }
    }

    return(
        <OverlayContainer>
            <AppBackgorund />
            {isLoading ? <ActivityIndicator /> :
                <View>
                    {(userData.user.id != 1) ? <View style={{backgroundColor: color.white, marginTop: 12, paddingVertical: 8}}>
                        <FlatList
                            horizontal
                            
                            data={LeaveSummary}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item}) => (
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <Image source={require("../images/userwhite.png")}
                                            style={{height: 60, width: 60  , resizeMode: "contain"}} 
                                        />
                                    <View style = {{flex: 2, flexDirection: "column", alignContent: "center", justifyContent: "center", marginLeft: 4, marginEnd: 8}}>
                                        <Text style={{textAlign: "center", fontSize: 14, fontWeight: '800'}}>{item.count} Days</Text>
                                        <Text style={{textAlign: "center", marginTop: 6, fontSize: 12, fontWeight: "400", color: color.lightGray}}>{item.type}</Text>
                                    </View>
                                </View>
                            )}

                        />
                    </View> : null}
                    {/* <Text style={{color: '#fff'}}>{LeavesData}</Text> */}
                    <FlatList 
                        data={LeavesData}
                        keyExtractor={({id}, index) => id}

                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("leaveDetail", {data: item});
                            }
                            }>
                            <View style={leavStyle.cardStyle}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, flexDirection: 'column'}}>
                                        <Text style={{fontSize: 18, fontWeight: '600'}}>{item.user.name}</Text>
                                        <Text style={{fontSize: 16, fontWeight: '500', marginTop: 4}}>{leaveTypes.find(type => type.id == item.leave_type).value}</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                    <View style={[leavStyle.statusStyle, {backgroundColor: (item.status == 0) ? color.yellow : (item.status == 1) ?  color.green : color.red}]}>
                                        <Image source={require("../images/clock.png")}
                                            style={{height: 16, width: 16, tintColor: Colors.color.white, resizeMode: "contain"}} 
                                        />
                                        <Text style={{fontSize: 15, fontWeight: '600', color: color.white, marginLeft: 4}}>{leaveStatus.find(status => status.id == item.status).value}</Text>
                                    </View>
                                    </View>
                                </View>
                                <View style={{marginLeft: 8}}>
                                    <View style={{flex: 1, flexDirection: 'row', marginVertical: 8}}>
                                        <Image source={require("../images/calendar.png")}
                                            style={{height: 16, width: 16, tintColor: Colors.color.black, resizeMode: "contain"}} 
                                        />
                                        <Text style={{fontSize: 16, fontWeight: '400', color:color.purple, marginLeft: 6}}>Date: </Text>
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{leaveDate(item)}</Text>
                                    </View>
                                    <Text style={{fontSize: 16, fontWeight: '400', color:color.purple}}>{item.reason}</Text>
                                </View>
                                {(userData.user.id == 1 && item.status == 0) ? 
                                    <View style = {{flex: 1, flexDirection: "row", marginTop: 8}}>
                                        <TouchableOpacity style={{flex: 1, padding: 8}} onPress={() => updateStatus(item.id, item.user_id, 2)}>
                                            <View style={{borderWidth: 1, borderColor: color.darkGray, borderRadius: 4, justifyContent: "center", height: 32}}>
                                                <Text style={{textAlign: "center", fontSize: 16, fontWeight: '600', color: color.darkGray}}>Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flex: 1, padding: 8}} onPress={() => updateStatus(item.id, item.user_id, 1)}>
                                            <View style={{borderRadius: 4, backgroundColor: color.green, justifyContent: "center", height: 32}}>
                                                <Text style={{textAlign: "center", fontSize: 16, fontWeight: '600', color: color.white}}>Approve</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View> : null
                                }
                            </View>
                                </TouchableOpacity>
                            )}
                            style={{marginTop: 24}}
                        />
                </View>
            }
        </OverlayContainer>
    )
};

export default LeavesRequestListing;

const leavStyle = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
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
    }
})