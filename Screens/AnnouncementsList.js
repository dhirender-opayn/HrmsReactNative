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
import Toast from "react-native-toast-message";
import { AuthContext, UserContext } from "../utils/context";
import { apiCall } from "../utils/httpClient";
import apiEndPoints from "../utils/apiEndPoints";
import { StyleSheet } from "react-native";
import moment from 'moment';
import ImagesPath from "../images/ImagesPath";

const AnnouncementList = ({navigation=useNavigation(), route}) => {
    const [noticeData, setNoticeData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [listPage, setListPage] = useState(1);

    const setData = () => {
        let DummyNotices = [{id: 0, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: false},
            {id: 1, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
            {id: 2, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
            {id: 3, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
            {id: 4, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
            {id: 5, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
            {id: 6, question: "Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true},
            {id: 7, question: "Lorem lpsum is simply dummy text, Lorem lpsum is simply dummy text?", answer: "Yes, Lorem lpsum is simply dummy text of the printing and typesetting industry, Lorem lpsum is simply dummy text of the printing and typesetting industry.", hidden: true}];
        setNoticeData(DummyNotices);
    }
       
        const getAttendanceData = async(pageNum) => {
            // try {
            //         const {data} = await apiCall("GET", apiEndPoints.AttendanceList+"?page="+pageNum);
            //         // console.log(data);
            //             setAttendanceData(data.data);
                    
            //     } catch (error) {
            //         console.error(error);
            //         Toast.show({type: "error", text1: error});
            //     } finally {
            //         setLoading(false);
            //     }
        };

        const toggleNoticeView = (index) => {
            var notices = [...noticeData];
            notices[index].hidden = !notices[index].hidden;
            setNoticeData(notices);
        }

        useEffect(() => {
            setData();
        }, []);
    
    return(
        <OverlayContainer>
            <AppBackgorund />
                { isLoading ? <ActivityIndicator /> :
               
                    <FlatList 
                            data={noticeData}
                            keyExtractor={({id}, index) => id}
                            renderItem={({item, index}) => ( <View style = {CustomStyling.cardStyle}>
                                <TouchableOpacity onPress={() => {
                                    toggleNoticeView(index);
                                }}>
                                    <View style={{width:4, height: 4, borderRadius: 2, backgroundColor: color.darkRed, marginTop: 4, marginLeft: 4}}>

                                    </View>
                                    <View style={{ flexDirection: "row", marginHorizontal: 8, marginBottom: 8}}>
                                        <Text style={[CustomStyling.medium16Text, {width: '90%', }]}>{item.question}</Text>
                                        <View style={{width: '10%', justifyContent: "center"}}>
                                            <Image source={(item.hidden) ? ImagesPath.downArrowImg : ImagesPath.upArrowImg}
                                            style={{width: 16, height: 16, resizeMode: "contain"}}
                                            />
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                    {(!item.hidden) ? (<View>
                                        <View style={CustomStyling.seperatorStyle}>
                                        </View>
                                        <View style={{flexDirection: "row", margin: 8}}>
                                            <Text style={[CustomStyling.regular16Text, {fontSize: 14}]}>{item.answer}</Text>
                                    
                                        </View> 
                                    </View>) : null}
                                </View> )
                            }
                            
                    />
                } 
                        
                   
        </OverlayContainer>
    );
};

export default AnnouncementList;

const annStyle = StyleSheet.create({
    TextStyle: {
        fontSize: 16, 
        fontWeight: '700',
        color: color.darkGray
    },
});
