import { Text, ScrollView, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import String, { strings } from "../Common/String";
import Colors, { color } from "../Common/Colors";
import { MainButton } from "../components/mainButton";
import Global from "../Common/Global";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import FloatTextField from "../helper/FloatTextField";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import { LoaderContext } from "../utils/context";
import Toast  from "react-native-toast-message";
import Validations from "../Common/Validations";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";

export const OtpVerify = ({ navigation, route }) => {

    const [otp, setOtp] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showErrMsg, setShowErrMsg] = useState(false);
    let formdata = new FormData();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    const buttonPress = () => {
        if (Validations.OtpValidation(otp) || Validations.PasswordValidation(password) || confirmPassword != password){
            setShowErrMsg(true)
        }
        else{
            setShowErrMsg(false);
            showLoader();
            OtpApiCall();
        }
    };

    const OtpApiCall = async () => {
        formdata.append("code", otp);
        formdata.append("password", password);
        formdata.append("confirm_password", confirmPassword);

        const request = new Request(Global.projct.android.BASE_URL + Global.projct.android.RESETPASSWORD, {
            method: 'POST', headers: {
                Accept: 'application/json',
            }, body: formdata
        });
        try {
            const response = await fetch(request)
            const json = await response.json();
           
            if (json.message.toLowerCase().includes("success")){
                navigation.navigate('Login');
                Toast.show({type: "success", text1: json.message});
            }else{
                Toast.show({type: "error", text1: json.message});
            }
        } catch (error) {
            Toast.show({type: "error", text1: error});
            console.error(error);
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
            <ScrollView style={AuthStyle.mainContainer}>
                <View >
                    <Text style={[AuthStyle.viewSubTitile, {marginBottom: 20}]}>{strings.title}</Text>
                    <Text style={[AuthStyle.medium16Text, {marginBottom: 24}]}>{strings.optmsg}</Text>

                    {/* Card Container */}
                    <View style={AuthStyle.CardmainContainer}>
                        <Text style={CustomStyling.containerTitle}>{strings.enter_code}</Text>
                        <View style={{ marginTop: 8 }}>
                            
                            <FloatTextField 
                                placeholder="Enter OTP"
                                defaultValue={otp}
                                pickerLabel="OTP"
                                onTextChange={(val) => setOtp(val)}
                                showError={(showErrMsg && Validations.OtpValidation(otp))}
                                errorText={Validations.OtpValidation(otp)}
                            />
                           
                              <FloatTextField 
                                placeholder="Enter New Password"
                                defaultValue={password}
                                pickerLabel="New Password"
                                onTextChange={(val) => setPassword(val)}
                                isPasswordField={true}
                                showError={(showErrMsg && Validations.PasswordValidation(password))}
                                errorText={Validations.PasswordValidation(password)}
                            />
                          
                             <FloatTextField 
                                placeholder="Re-Enter Password"
                                defaultValue={confirmPassword}
                                pickerLabel="Confirm Password"
                                onTextChange={(val) => setConfirmPassword(val)}
                                isPasswordField={true}
                                showError={(showErrMsg && (confirmPassword == password))}
                                errorText={"Please enter confirm password same as new password"}
                            />

                            <MainButton text={strings.submit} onPress={() => buttonPress()} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            </KeyboardAwareView>
        </OverlayContainer>
    );
}