import React, { useEffect, useRef } from "react";
import { ActivityIndicator, SafeAreaView, Text, View, StyleSheet, BackgroundView } from "react-native";
import Colors, { color } from "../Common/Colors";
import { Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

 const AppBackgorund = () => {
    return(
    <View  style={{ flex: 1}}>
        <View style={styles.parent}>
            <View style={{position: 'absolute', top: 0, width: "67%", bottom: 0, justifyContent: "flex-end", backgroundColor:color.backgroundBlack, alignSelf: "center"}}></View>
            {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{position: 'absolute', top: 0, width: "67%", bottom: 0, justifyContent: "flex-end", backgroundColor:color.backgroundBlack, alignSelf: "center"}}/> */}
        </View>
    </View>

    ); 

 };

 const styles = StyleSheet.create({
	parent : {
        backgroundColor: "transparent",
        height : '50%',
        width : '100%',
        transform : [ { scaleX : 1.5 } ],
        borderBottomStartRadius : 1000,
        borderBottomEndRadius : 1000,
        borderWidth: 0,
        borderColor: color.backgroundBlack,
        overflow : "hidden"
    }
});

 export default AppBackgorund;

