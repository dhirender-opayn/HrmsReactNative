import { SafeAreaView, Text, TextInput, ScrollView, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { MainButton } from "../components/mainButton";
import { EmailValidation } from "../helper/Validation";
import String, { strings } from "../Common/String";
import { useNavigation } from "@react-navigation/native";
import Global, { projct } from "../Common/Global";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import Colors from "../Common/Colors";
import FloatTextField from "../helper/FloatTextField";
import { LoaderContext } from "../utils/context";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import Toast from 'react-native-toast-message';

export const Forget = ({ navigation = useNavigation() }) => {
    const [email, setEmail] = useState("");
    const [showErrMsg, setShowErrMsg] = useState(false);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    let formData = new FormData()

    const onButtonPress = () => {

        if (EmailValidation(email)) {
            setShowErrMsg(true);
        }
        else{
            setShowErrMsg(false)
            showLoader();
            forgetApi();
        }
    }
   

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
            console.log(json);
            if (json.hasOwnProperty("data")){
                navigation.navigate('OtpVerify');
            }
            else{
                Toast.show({type: "error", text1: json.message});
            }
        } catch (error) {
            Toast.show({type: "error", text1: error});
        } finally {
            hideLoader();
        }
    };

    useEffect(() => {
        setShowErrMsg(false);
    }, [])

    return (
        <OverlayContainer>
            <AppBackgorund />
            <KeyboardAwareView doNotForceDismissKeyboardWhenLayoutChanges={true} animated={true}>
            <ScrollView style={{padding: 16, marginTop: 40, flex: 1}}>
                <View style={{flex: 1, height: "100%"}}>
                    <View style={{ marginTop: 0, height: "50%" }}>
                        <Text style={AuthStyle.viewSubTitile} >{String.strings.title}</Text>
                        <Text style={AuthStyle.medium16Text} >{String.strings.forgetMsg}</Text>
                    </View>
                    <Text style={[AuthStyle.viewTitile, {marginTop: 32}]} >{String.strings.forgotPassword}</Text>
                    </View>
                    <View style={{flex: 1}}> 

                    <View style={[AuthStyle.CardmainContainer, {paddingVertical: 32, marginTop: 48}]}> 
                        <FloatTextField 
                            placeholder="Enter Your Email"
                            defaultValue={email}
                            pickerLabel={strings.email}
                            onTextChange={(val) => setEmail(val)}
                            showError={(showErrMsg && EmailValidation(email))}
                            errorText={EmailValidation(email)}
                        />
                        <MainButton text={'Submit'} onPress={onButtonPress} />
                    </View>
                </View>
            </ScrollView>
            </KeyboardAwareView>
        </OverlayContainer>

    );
}