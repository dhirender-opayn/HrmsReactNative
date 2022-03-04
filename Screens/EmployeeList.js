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


const EmployeeList = ({navigation=useNavigation()}) => {
    const [userData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [teamData, setTeamData] = useState([]);
    const toast = useToast();
   
    const getTeamData = async() => {
        try {
                const {data} = await apiCall("GET", apiEndPoints.Team);
                console.log(data);
                setTeamData(data.data);
            } catch (error) {
                console.error(error);
                toast.show(error, { duration: 3000 })
            } finally {
                setLoading(false);
            }
    }
    useEffect(() => {
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
                            <View style={empStyle.cardStyle}>
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
                                        <Text style={{fontSize: 18, fontWeight: '600'}}>{item.name}</Text>
                                        <Text style={{fontSize: 16, fontWeight: '500', marginTop: 4}}>
                                            {item.roles[0].name}
                                        </Text>
                                    </View>
                                </View>
                                
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

export default EmployeeList;

const empStyle = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 8,
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
    },
    imageStyle: {
        height: 70,
        width: 70,
        borderRadius: 8,
        //resizeMode: "contain"

    }
});