import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { MainButton } from "../components/mainButton";
import { EmailValidation } from "../helper/Validation";
import String from "../Common/String";
import { useNavigation } from "@react-navigation/native";
 

export const Forget = ({navigation = useNavigation()}) => {
    const [email, setEmail] = useState();
 
    const onButtonPress = () => {
        console.log("check value")
       navigation.navigate('OtpVerify');
        if (!EmailValidation(email)) {
          
           
            console.log("Email   valid ")
        }
    }

    return (
        <SafeAreaView style={AuthStyle.mainContainer}>
            <View>
                <View style={{ marginTop: 60 }}>
                    <Text style={AuthStyle.text} >{String.strings.title}</Text>
                    <Text style={AuthStyle.subText} >{String.strings.forgetMsg}</Text>
                </View>
                <View style={{ height: 100 }} />
                <Text style={AuthStyle.textTitile} >{String.strings.forgotPassword}</Text>

                <View style={{ marginTop: 60 }}>
                    <TextInput onChangeText={(text) => setEmail(text)} value={email} style={AuthStyle.inputText} placeholder="Enter Your E-mail" placeholderTextColor={'white'} />
                    <TouchableOpacity>
                        <MainButton  text={'submit'} onPress={onButtonPress}/>
                        {/* <Text style={AuthStyle.mainButtonText}>Submit </Text> */}
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>

    );
}