import { Text, TextInput, TextInputBase, TouchableOpacity, View } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import String, { strings } from "../Common/String";
import Colors, { color } from "../Common/Colors";
import { MainButton } from "../components/mainButton";
import { OtpValidation, PasswordValidation } from "../helper/Validation";
import Global from "../Common/Global";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import FloatTextField from "../helper/FloatTextField";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import { LoaderContext } from "../utils/context";
import { useToast } from "react-native-toast-notifications";
import Validations from "../Common/Validations";


export const OtpVerify = ({ navigation, route }) => {

    const [otp, setOtp] = useState();
    const [password, setPassword] = useState();
    const [comfirmPassword, setComfirmPassword] = useState();
    const [message, setMessage] = useState('');3 
    let formdata = new FormData();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    let toast = useToast();

    const buttonPress = () => {
        console.log("press")
        if (Validations.OtpValidation(otp)){
            toast.show(Validations.OtpValidation(otp), {duration: 3000});
        }
        else if (Validations.PasswordValidation(password)){
            toast.show(Validations.PasswordValidation(password), {duration: 3000});
        }
        else if (comfirmPassword != password){
            toast.show("Please enter confirm password same as new password", {duration: 3000});
        }
        else{
            console.log("Success OTp Phase");
            showLoader();
            OtpApiCall();
        }
    };

    const OtpApiCall = async () => {
        formdata.append("code", otp);
        formdata.append("password", password);
        formdata.append("confirm_password", comfirmPassword);

        const request = new Request(Global.projct.android.BASE_URL + Global.projct.android.RESETPASSWORD, {
            method: 'POST', headers: {
                Accept: 'application/json',
            }, body: formdata
        });
        try {
            const response = await fetch(request)
            const json = await response.json();
            console.log(json);
            toast.show(json.message, {duration: 3000});
            if (json.message.toLowerCase().includes("success")){
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error(error);
        } finally {
            hideLoader();
        }

    };

    return (
        <OverlayContainer>
            <AppBackgorund />

            <SafeAreaView style={AuthStyle.mainContainer}>
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
                            />
                           
                              <FloatTextField 
                                placeholder="Enter New Password"
                                defaultValue={password}
                                pickerLabel="New Password"
                                onTextChange={(val) => setPassword(val)}
                                isPasswordField={true}
                            />
                          
                             <FloatTextField 
                                placeholder="Re-Enter Password"
                                defaultValue={comfirmPassword}
                                pickerLabel="Confirm Password"
                                onTextChange={(val) => setComfirmPassword(val)}
                                isPasswordField={true}
                            />
                            <MainButton text={strings.submit} onPress={() => buttonPress()} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </OverlayContainer>
    );
}