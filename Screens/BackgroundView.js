import React, { useEffect, useRef } from "react";
import { ActivityIndicator, SafeAreaView, Text, View, StyleSheet, BackgroundView } from "react-native";
import Colors from "../Common/Colors";
import { Dimensions } from "react-native";
 
 const AppBackgorund = () => {
    return(
    <View style={{ flex: 1 }} >
        <View style={styles.parent}>
            <View style={{position: 'absolute', top: 0, width: "67%", bottom: 0, justifyContent: "flex-end", backgroundColor:"#222", alignSelf: "center"}}></View>
  </View>
</View>

    ); 

 };

 const styles = StyleSheet.create({
	parent : {
        backgroundColor: "transparent",
<<<<<<< HEAD
        height : '35%',
=======
        height : '40%',
>>>>>>> 191cc2ffb6454144cf61b4090e777f8e4e19ee3f
        width : '100%',
        transform : [ { scaleX : 1.5 } ],
        borderBottomStartRadius : 1000,
        borderBottomEndRadius : 1000,
        borderWidth: 0,
        borderColor: "#000",
        overflow : "hidden"
    }
});

 export default AppBackgorund;

