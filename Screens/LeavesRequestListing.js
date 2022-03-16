import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";
import Colors, { color } from "../Common/Colors";
import { OverlayContainer } from "../Common/OverlayContainer";
import apiEndPoints from "../utils/apiEndPoints";
import { LoaderContext, UserContext } from "../utils/context";
import { apiCall } from "../utils/httpClient";
import AppBackgorund from "./BackgroundView";
import moment from 'moment';
import { StyleSheet } from "react-native";
import { types } from "@babel/core";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import fonts from "../Common/fonts";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const LeavesRequestListing = ({navigation=useNavigation()}) => {
    const [userData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [LeavesData, setLeavesData] = useState([]);
    const [showNoData, setShowNoData] = useState(false);
    const toast = useToast();
    const LeaveSummary = [{id: 1, count: 18, type: "Casual Leave"}, {id: 2, count: 18, type: "Casual Leave"}, {id: 3, count: 18, type: "Casual Leave"}]
    const leaveTypes = [{value: "Single Day", id: 1}, {value: "Multiple Day", id: 2}, {value: "Short Leave", id: 4},
         {value: "First Half", id: 5}, {value: "Second Half", id: 6}, {value: "", id: 0}, {value: "", id: 3}];
    const leaveStatus = [{value: "Pending", id: 0}, {value: "Approved", id: 1}, {value: "Rejected", id: 2}];
    const { showLoader, hideLoader } = useContext(LoaderContext);

    const getLeavesData = async() => {
        try {
                const {data} = await apiCall("GET", apiEndPoints.LeaveListing);
                if (data.hasOwnProperty("data")){
                    setLeavesData(data.data);
                    if (data.data.length == 0){
                        setShowNoData(true);
                    }else{
                        setShowNoData(false);
                    }
                }
                else{
                    toast.show(data.message, {duration: 3000});
                }
            } catch (error) {
                toast.show(error, { duration: 3000 })
            } finally {
                setLoading(false);
                hideLoader();
            }
    }
    useEffect(() => {
        setLoading(true);
        getLeavesData();
    }, []);

    const leaveDate = (data) => {
        var dateStr = ""
        if(data.leave_type == 2){
            dateStr = moment.utc(data.start_date).format("DD MMM, YYYY");
            dateStr += " - ";
            dateStr += moment.utc(data.end_date).format("DD MMM, YYYY");
        }
        else if (data.leave_type == 4){
            dateStr = moment.utc(data.start_date).format("DD MMM, YYYY");
            dateStr += " (";
            dateStr += moment.utc(data.start_date).local().format("HH:mm");
            dateStr += " - ";
            dateStr += moment.utc(data.end_date).local().format("HH:mm") + ")";
        }
        else{
            dateStr = moment.utc(data.start_date).format("DD MMM, YYYY");
        }
        return dateStr;
    };

    const updateStatus = async(id, userid, status) => {
        try {
            const {data} = await apiCall("POST", apiEndPoints.UpdateLeaveStatus, {user_id: userid, id: id, status: status});
            
           if (data.hasOwnProperty("data")){
                var leaves = [...LeavesData];
                var index = leaves.findIndex(item => item.id == id);
                leaves[index].status = status;
                setLeavesData(leaves);
           }
           toast.show(data.message, {duration: 4000});
        } catch (error) {
            toast.show(error, { duration: 3000 })
        } finally {
            hideLoader();
        }
    }

    const updateData = (item) => {
        var leaves = [...LeavesData];
        var index = leaves.findIndex(leave => leave.id == item.id);
        let leaveData = {...leaves[index]};
        leaveData["status"] = item.status;
        leaves[index] = {...leaveData};
        setLeavesData(leaves);
    }

    return(
        <OverlayContainer>
            <AppBackgorund />
            {isLoading ? <SkeletonPlaceholder speed={700} backgroundColor= {color.skeletonGray}>
            
            <View style={{height: '100%'}}>
            {[...Array(10)].map((elementInArray, index) => ( 
      <View style={[{ flexDirection: "column",marginHorizontal: 16, marginVertical: 8,
              padding: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: color.lightGray, }]}>
      
              <View style={{  width: "100%", flexDirection: "row" }}>
                  <View style={{width: '50%', alignItems: "flex-start"}}>
                <View style={{ width: 120, height: 16, borderRadius: 4}} />
                </View>
                <View style={{width: '50%', alignItems: "flex-end"}}>
                <View
                  style={{ width: 120, height: 20, borderRadius: 4 }}
                />
                </View>
              </View>
          
                <View style={{ width: 120, height: 16, borderRadius: 4, marginTop: 8 }} />
                <View style={{ marginLeft: 8, width: "100%", flexDirection: "row", marginTop: 8 }}>
                    <View  style={{ width: 20, height: 16, borderRadius: 4 }}/>
                    <View  style={{ width: 80, height: 16, borderRadius: 4, marginLeft: 4 }}/>
                    <View  style={{ width: 110, height: 16, borderRadius: 4, marginLeft: 4 }}/>
                </View>
                <View
                  style={{ marginTop: 8, marginLeft: 8, width: '90%', height: 16, borderRadius: 4 }}
                />
            </View>
            ))}
            </View>
            </SkeletonPlaceholder>  :
                <View style={{flex: 1}}>
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
                                        <Text style={{textAlign: "center", fontSize: 15, fontFamily: fonts.bold, color: color.titleBlack}}>{item.count} Days</Text>
                                        <Text style={{textAlign: "center", marginTop: 6, fontSize: 12, fontFamily: fonts.medium, color: color.darkGray}}>{item.type}</Text>
                                    </View>
                                </View>
                            )}

                        />
                    </View> : null}
                    {(!showNoData) ? <FlatList 
                        data={LeavesData}
                        keyExtractor={({id}, index) => id}

                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("leaveDetail", {data: item, updatedData: ((val) => {updateData(val)}) });
                            }
                            }>
                            <View style={CustomStyling.cardStyle}>
                                <View style={{flex: 1, flexDirection: 'row', marginTop: 8}}>
                                    <View style={{flex: 2, flexDirection: 'column'}}>
                                        <Text style={{fontSize: 16, fontFamily: fonts.semiBold, color: color.titleBlack}}>{item.user.name}</Text>
                                        <Text style={{fontSize: 14, fontFamily: fonts.semiBold, marginTop: 4, color: color.titleBlack}}>{leaveTypes.find(type => type.id == item.leave_type).value}</Text>
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
                                            style={{height: 16, width: 16, tintColor: Colors.color.imageBlack, resizeMode: "contain"}} 
                                        />
                                        <Text style={{fontSize: 14, fontFamily: fonts.medium, color:color.backgroundBlack, marginLeft: 6}}>Date: </Text>
                                        <Text style={{fontSize: 14, fontFamily: fonts.medium, color: color.titleBlack}}>{leaveDate(item)}</Text>
                                    </View>
                                    <Text style={{fontSize: 16, fontFamily: fonts.medium, color:color.backgroundBlack}}>{item.reason}</Text>
                                </View>
                                {(userData.user.id == 1 && item.status == 0) ? 
                                    <View style = {{flex: 1, flexDirection: "row", marginTop: 8}}>
                                        <TouchableOpacity style={{flex: 1, padding: 8}} onPress={() => {
                                            showLoader();
                                            updateStatus(item.id, item.user_id, 2)
                                        }}>
                                            <View style={{borderWidth: 1, borderColor: color.darkGray, borderRadius: 4, justifyContent: "center", height: 32}}>
                                                <Text style={{textAlign: "center", fontSize: 16, fontFamily: fonts.bold, color: color.darkGray}}>Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flex: 1, padding: 8}} onPress={() => {
                                            showLoader();
                                            updateStatus(item.id, item.user_id, 1)
                                        }}>
                                            <View style={{borderRadius: 4, backgroundColor: color.green, justifyContent: "center", height: 32}}>
                                                <Text style={{textAlign: "center", fontSize: 16, fontFamily: fonts.bold, color: color.white}}>Approve</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View> : null
                                }
                            </View>
                                </TouchableOpacity>
                            )}
                             style={{marginTop: 24, marginBottom: 4}}
                        /> : <Text style={CustomStyling.NoDataLabel}>No Data Found</Text>}
                </View>
            }
        </OverlayContainer>
    )
};

export default LeavesRequestListing;
