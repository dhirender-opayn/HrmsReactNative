import React from "react";
import { useState, useEffect } from "react";
import { OverlayContainer } from "../Common/OverlayContainer";
import { View, Image, Text, ActivityIndicator } from "react-native";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import AppBackgorund from "./BackgroundView";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileView = () => {
    const [userdata, setData] = useState({});
     const [isLoad, setLoad] = useState(true)
    var detail =  "";
    const [deail, setDetail] = useState("");
    const retrieveData = async() => {
        try{
         detail =  await AsyncStorage.getItem('userData');
         console.log(detail);
         setDetail(detail)
         setData(JSON.parse(detail));
        }
        catch (error){
            console.error(error);
        }
        finally{
            setLoad(false);
        }
    };
    useEffect(() =>{ 
        retrieveData();
    }, []);
    return(
        <OverlayContainer>
            <AppBackgorund />
            <Text>Hello</Text>
            <View style={{padding: 16}}>
                {/* <Text>{deail}</Text> */}
                { isLoad ? <ActivityIndicator /> :
               ( <View style={{flexDirection: "row", marginTop: 24}}>
                    <Image source={{
                            uri: userdata.user.profile.image,
                            method: 'GET'
                        }}
                        style={{width:80, height: 80, borderRadius: 40}}
                    />
                    <View style={{padding: 8}}>
                        <Text style={AuthStyle.textTitile}>{userdata.user.name}</Text>
                        <Text style={AuthStyle.textTitile}>{userdata.user.roles[0].name}</Text>
                    </View>
                </View>
                )}
            </View>
        </OverlayContainer>
    );
};

export default ProfileView;