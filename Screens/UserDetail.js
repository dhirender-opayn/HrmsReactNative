import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, Text, View, StyleSheet, BackgroundView } from "react-native";
 import { useNavigation } from "@react-navigation/native";
 import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react/cjs/react.development";
import Colors from "../Common/Colors";
import { Dimensions } from "react-native";
import AppBackgorund from "./BackgroundView";
import { OverlayContainer } from "../Common/OverlayContainer";


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
        //retrieveData();
    }, []);
    return(
    
    //     <View>
    //         <View style={styles.parent}></View>
    //         <View style={{position: 'absolute', top: 16, left: 0, right: 0, bottom: 24, justifyContent: "flex-end"}}>
    //         <Text>Hello</Text>
    //         </View>
    //         {/* s */}
    //    </View>
    //<AppBackgorund>
         /* <SafeAreaView style={{ flex: 1 }} >
        <View style={{ height: Dimensions.get('window').height , backgroundColor: 'blue', justifyContent: 'center' }}>
            <Text style={{ fontSize: 25, alignSelf: 'center' }} >A</Text>
            
        </View>
        </SafeAreaView> */
       // <Text style={{fontSize:34, color: '}}>Hello</Text>
//</AppBackgorund>
        <OverlayContainer>
            <AppBackgorund />
            <Text style={{fontSize: 30,color:"#fff"}}>Hello</Text>
            {/* <View style={{ height: Dimensions.get('window').height , backgroundColor: 'blue', justifyContent: 'center' }}>
                <Text>Hello</Text>
            </View> */}
        </OverlayContainer>
    ); 

 };

 const styles = StyleSheet.create({
	parent : {
        backgroundColor: "#222",
        height : '70%',
        width : '100%',
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        borderWidth: 2,
        borderColor: "#000",
        overflow : 'hidden',
    }
});

 export default UserDetail;