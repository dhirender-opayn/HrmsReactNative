import { Text, TextInput, TextInputBase, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import String, { strings } from "../Common/String";
import Colors, { color } from "../Common/Colors";
import { MainButton } from "../components/mainButton";
import { OtpValidation, PasswordValidation } from "../helper/Validation";
import Global from "../Common/Global";
 

export const OtpVerify = ({ navigation, route }) => {

    const [otp, setOtp] = useState();
    const [password, setPassword] = useState();
    const [comfirmPassword, setComfirmPassword] = useState();
    const [message, setMessage] = useState('');
    const [data, setData] = useState({});
    let formdata = new FormData();

    const buttonPress = () => {
        console.log("press")
        if (!OtpValidation(otp) && !PasswordValidation(password) && !PasswordValidation(comfirmPassword) && password.match(comfirmPassword)) {
            console.log("Success OTp Phase");
            OtpApiCall();
        }  else {
            console.log("UnSuccess OTp Phase");
        }
    }
    const OtpApiCall = async() => {
        formdata.append(Global.projct.android.code, otp);
        formdata.append(Global.projct.password,password);
        formdata.append(Global.projct.android.confirm_password,comfirmPassword);

        const request = new Request(Global.projct.android.BASE_URL+Global.projct.android.RESETPASSWORD,{
            method:'POST', headers:{
                Accept: 'application/json',
            },body:formdata
        });
        try {
            const response = await fetch(request)
            const json = await response.json();
            setMessage(json.message);
            setData(json.data);
            const object = JSON.stringify(json.data);
            navigation.navigate('Login');
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }

    };

    return (
        <SafeAreaView style={AuthStyle.mainContainer}>
            <View style={{ marginTop: 80 }}>
                <Text style={AuthStyle.text}>{strings.title}</Text>
                <View style={{ height: 20 }} />
                <Text style={AuthStyle.subText}>{strings.optmsg}</Text>
                <View style={{ height: 30 }} />

                {/* Card Container */}
                <View style={AuthStyle.CardmainContainer}>
                    <Text style={AuthStyle.Cardtext}>{strings.enter_code}</Text>
                    <View style={{ marginTop: 10 }}>
                        <TextInput onChangeText={(otp) => setOtp(otp)} value={otp} style={AuthStyle.CardinputText} keyboardType="number-pad" placeholder={strings.enterOtp} placeholderTextColor={color.gray} />
                        <TextInput onChangeText={(new_pass) => setPassword(new_pass)} value={password} style={AuthStyle.CardinputText} placeholder={strings.newPassword} placeholderTextColor={color.gray} />
                        <TextInput onChangeText={(comfirm_pass) => setComfirmPassword(comfirm_pass)} value={comfirmPassword} style={AuthStyle.CardinputText} placeholder={strings.comfirmPassword} placeholderTextColor={color.gray} />
                        <TouchableOpacity>
                            <MainButton text={strings.submit} onPress={() => buttonPress()} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 30 }} />
                </View>


            </View>
        </SafeAreaView>
    );
}