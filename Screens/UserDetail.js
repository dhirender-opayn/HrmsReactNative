import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
 import { useNavigation } from "@react-navigation/native";
 import UserData from "../Common/UserData";
 import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react/cjs/react.development";

 const UserDetail = ({navigation=useNavigation()}) => {
     const [data, setData] = useState({});
     const [isLoad, setLoad] = useState(true)
    var detail =  "";
    
    // detail = JSON.parse(detail); // {foo:'foo', bar:'bar'}; 
    //     console.warn(detail)

    const retrieveData = async() => {
        try{
         detail =  await AsyncStorage.getItem('userData');
         console.log(detail);
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
        <View>
            {
                isLoad ? <ActivityIndicator /> : ( <Text>{data.user.name}</Text>)
            }
       </View>
    ); 

 };

 export default UserDetail;