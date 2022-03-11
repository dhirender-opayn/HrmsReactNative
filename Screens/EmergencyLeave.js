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
import ImagesPath from "../images/ImagesPath";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import fonts from "../Common/fonts";


const EmergencyLeave = ({navigation=useNavigation()}) => {
    const [userData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [LeavesData, setLeavesData] = useState([]);
    const toast = useToast();
    const LeaveSummary = [{id: 1, count: 18, type: "Casual Leave"}, {id: 2, count: 18, type: "Casual Leave"}, {id: 3, count: 18, type: "Casual Leave"}]
    const leaveTypes = [{value: "Single Day", id: 1}, {value: "Multiple Day", id: 2}, {value: "Short Leave", id: 4},
         {value: "First Half", id: 5}, {value: "Second Half", id: 6}, {value: "", id: 0}, {value: "", id: 3}];
    const leaveStatus = [{value: "Pending", id: 0}, {value: "Approved", id: 1}, {value: "Rejected", id: 2}];
    const { showLoader, hideLoader } = useContext(LoaderContext);

    const getLeavesData = async() => {
        try {
                const {data} = await apiCall("GET", apiEndPoints.LeaveListing);
                console.log("Data" + data);
                setLeavesData(data.data);
            } catch (error) {
                console.error("EER: "+error);
                toast.show(error, { duration: 3000 })
            } finally {
                setLoading(false);
                hideLoader();
            }
    }
    useEffect(() => {
        showLoader();
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
                <View style={{flex: 1}}>
                    
                    {/* <Text style={{color: '#fff'}}>{LeavesData}</Text> */}
                    <FlatList 
                        data={LeavesData}
                        keyExtractor={({id}, index) => id}

                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("leaveDetail", {data: item});
                            }
                            }>
                                <View style={CustomStyling.cardStyle}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flex: 2, flexDirection: 'column'}}>
                                            <Text style={{fontSize: 18, fontFamily: fonts.semiBold}}>John Smith</Text>
                                            <Text style={{fontSize: 16, fontFamily: fonts.semiBold, marginTop: 4, color: color.red}}>Emergency Leave</Text>
                                        </View>
                                    </View>
                                    <View style={{marginLeft: 8}}>
                                        <View style={{flex: 1, flexDirection: 'row', marginVertical: 8}}>
                                            <Image source={ImagesPath.checkOutImage}
                                                style={{height: 16, width: 16, resizeMode: "contain"}} 
                                            />
                                            <Text style={{fontSize: 14, fontFamily: fonts.medium, color:color.purple, marginLeft: 6}}>Out Timimng: </Text>
                                            <Text style={{fontSize: 14, fontFamily: fonts.medium}}>12:00 pm</Text>
                                        </View>
                                        <Text style={{fontSize: 16, fontFamily: fonts.medium, color:color.purple}}>This is autogenerated request for emergency leave.</Text>
                                    </View>
                                    
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            }
        </OverlayContainer>
    )
};

export default EmergencyLeave;
