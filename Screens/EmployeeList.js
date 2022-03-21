import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Image, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import Toast from "react-native-toast-message";
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

const EmployeeList = ({navigation=useNavigation()}) => {
    const [userData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [refershing, setRefreshing] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const { showLoader, hideLoader } = useContext(LoaderContext);
   
    const getTeamData = async() => {
        try {
                const {data} = await apiCall("GET", apiEndPoints.Team);
                if (data.hasOwnProperty("data")){
                    setTeamData(data.data);
                }
                else{
                    Toast.show({type: "error", text1: data.message});
                }
            } catch (error) {
                Toast.show({type: "error", text1: error});
            } finally {
                setLoading(false);
                setRefreshing(false);
                hideLoader();
            }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getTeamData();
      }, []);

    useEffect(() => {
        setLoading(true);
        getTeamData();
    }, []);

    return(
        <OverlayContainer>
            <AppBackgorund />
            {isLoading ? <SkeletonPlaceholder speed={700} backgroundColor={color.skeletonGray}>
            
            <View style={{height: '100%'}}>
            {[...Array(10)].map((elementInArray, index) => ( 
                <View style={[{ flexDirection: "row", alignItems: "center",marginHorizontal: 16, marginVertical: 8,
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: color.lightGray, }]}>
      
                    <View style={{ marginLeft: 4, }}>
                        <View style={empStyle.imageStyle} />
                    </View>
                
                    <View style={{ marginLeft: 8, }}>
                        <View style={{ width: 120, height: 16, borderRadius: 4, alignSelf: "flex-end" }} />
                        <View
                        style={{ marginTop: 6, width: 80, height: 16, borderRadius: 4 }}
                        />
                    </View>
                </View>
            ))}
                </View>
            </SkeletonPlaceholder>  :
                <View>
                    <FlatList 
                        data={teamData}
                        keyExtractor={({id}, index) => id}

                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("employeeDetail", {id: item.id});
                            }
                            }>
                            <View style={CustomStyling.cardStyle}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    {(item.profile.image != null) ? 
                                        (<Image 
                                            source={{
                                                uri: item.profile.image,
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
                                    <View style={{flex: 2, flexDirection: 'column', justifyContent: "center", marginLeft: 8}}>
                                        <Text style={{fontSize: 16, fontFamily: fonts.bold, color: color.titleBlack}}>{item.name}</Text>
                                        <Text style={{fontSize: 14, fontFamily: fonts.medium, marginTop: 4, color: color.subtitleBlack}}>
                                            {item.roles[0].name}
                                        </Text>
                                    </View>
                                </View>
                                
                            </View>
                            </TouchableOpacity>
                            )}
                            style={{marginTop: 8}}
                            refreshControl={
                                <RefreshControl refreshing= {refershing} onRefresh={onRefresh} />
                              }
                        />
                </View>
            }
        </OverlayContainer>
    )
};

export default EmployeeList;

const empStyle = StyleSheet.create({
    
    imageStyle: {
        height: 70,
        width: 70,
        borderRadius: 8,
    }
});