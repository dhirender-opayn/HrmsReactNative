import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Image, FlatList, TouchableOpacity, RefreshControl } from "react-native";
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


const EmployeeList = ({navigation=useNavigation()}) => {
    const [userData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [refershing, setRefreshing] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const toast = useToast();
    const { showLoader, hideLoader } = useContext(LoaderContext);
   
    const getTeamData = async() => {
        console.log("refresh");
        try {
                const {data} = await apiCall("GET", apiEndPoints.Team);
                console.log("Data: "+data);
                setTeamData(data.data);
            } catch (error) {
                console.error("ERR: "+error);
                toast.show(error, { duration: 3000 })
            } finally {
                setLoading(false);
                setRefreshing(false);
                console.log("Refreshed");
                hideLoader();
            }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getTeamData();
      }, []);

    useEffect(() => {
        showLoader();
        getTeamData();
    }, []);

    return(
        <OverlayContainer>
            <AppBackgorund />
            {isLoading ? <ActivityIndicator /> :
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
                            style={{marginTop: 24}}
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