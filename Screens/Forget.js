import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState, useContext } from "react";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { MainButton } from "../components/mainButton";
import { EmailValidation } from "../helper/Validation";
import String from "../Common/String";
import { useNavigation } from "@react-navigation/native";
import Global, { projct } from "../Common/Global";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import Colors from "../Common/Colors";
import FloatTextField from "../helper/FloatTextField";
import { LoaderContext } from "../utils/context";
 

export const Forget = ({ navigation = useNavigation() }) => {
    const [email, setEmail] = useState("");
    const [message, setMsg] = useState("");
    const [data, setData] = useState({});
    const { showLoader, hideLoader } = useContext(LoaderContext);

    let formData = new FormData()

    const onButtonPress = () => {
        console.log("check value")

        if (!EmailValidation(email)) {
            console.log("Email   valid ");
            showLoader();
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
            hideLoader();
        }
    };

    return (
        <OverlayContainer>
            <AppBackgorund />
            <SafeAreaView style={{padding: 16, marginTop: 40, justifyContent: "center", flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{ marginTop: 0 }}>
                        <Text style={AuthStyle.viewSubTitile} >{String.strings.title}</Text>
                        <Text style={AuthStyle.medium16Text} >{String.strings.forgetMsg}</Text>
                    </View>
                    <Text style={[AuthStyle.viewTitile, {marginTop: 32}]} >{String.strings.forgotPassword}</Text>
                    </View>
                    <View style={{flex: 1}}> 

                    <View style={{ marginTop: 16 ,marginHorizontal:25}}>
                        <FloatTextField 
                            placeholder="Enter Your Email"
                            defaultValue={email}
                            pickerLabel="Email"
                            onTextChange={(val) => setEmail(val)}
                        />
                        <MainButton text={'Submit'} onPress={onButtonPress} />
                    </View>
                </View>
            </SafeAreaView>
        </OverlayContainer>

    );
}