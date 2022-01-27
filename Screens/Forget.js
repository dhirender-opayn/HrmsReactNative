import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { MainButton } from "../components/mainButton";
import { EmailValidation } from "../helper/Validation";
import String from "../Common/String";
import { useNavigation } from "@react-navigation/native";
import Global, { projct } from "../Common/Global";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import Colors from "../Common/Colors";
 

export const Forget = ({ navigation = useNavigation() }) => {
    const [email, setEmail] = useState();
    const [message, setMsg] = useState("");
    const [data, setData] = useState({});
    let formData = new FormData()

    const onButtonPress = () => {
        console.log("check value")

        if (!EmailValidation(email)) {
            console.log("Email   valid ")
            forgetApi();

        }
    }
    console.log("message now : ", message)
    console.log("data ===> ", data);

    const forgetApi = async () => {
        formData.append('email', email);

        const request = new Request(Global.projct.android.BASE_URL + Global.projct.android.forgetpassword, {
            method: 'POST', headers: {
                Accept: 'application/json',
            }, body: formData
        });
        try {
            const response = await fetch(request)
            const json = await response.json();
            setMsg(json.message);
            setData(json.data);
            const object = JSON.stringify(json.data);
            navigation.navigate('OtpVerify');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <OverlayContainer>
            <AppBackgorund />
        <SafeAreaView style={AuthStyle.mainContainer}>
            <View>
                <View style={{ marginTop: 60 }}>
                    <Text style={AuthStyle.text} >{String.strings.title}</Text>
                    <Text style={AuthStyle.subText} >{String.strings.forgetMsg}</Text>
                </View>
                <View style={{ height: 100,marginTop:10 }} />
                <Text style={AuthStyle.textTitile} >{String.strings.forgotPassword}</Text>

                <View style={{ marginTop: 60 ,marginHorizontal:25}}>
                    <TextInput onChangeText={(text) => setEmail(text)} value={email} style={AuthStyle.inputText} placeholder="Enter Your E-mail" placeholderTextColor={Colors.color.gray} />
                    <TouchableOpacity>
                        <MainButton text={'submit'} onPress={onButtonPress} />
                        {/* <Text style={AuthStyle.mainButtonText}>Submit </Text> */}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        </OverlayContainer>

    );
}