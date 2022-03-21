import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text } from "react-native";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { AuthContext, LoaderContext } from "../utils/context";
import FloatTextField from "../helper/FloatTextField";
import { MainButton } from "../components/mainButton";
import { TextButton } from "../components/TextButton";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { strings } from "../Common/String";
import { color } from "../Common/Colors";
import Toast from 'react-native-toast-message';

const LoginView = ({navigation = useNavigation()}) => {
    const [emailId, setEmail] = useState("");
    const [password, setPswrd] = useState("");
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const [showErrMsg, setShowErrMsg] = useState(false);

    const { signIn } = useContext(AuthContext);
    let formData = new FormData()
    
    const LoginApi = async() => {
      formData.append('email', emailId);
      formData.append('password', password);
      const request = new Request(Global.projct.ios.BASE_URL+Global.projct.apiSuffix.login, {method: 'POST', headers: {
        Accept: 'application/json',
        }, body: formData});
        try{
            const response = await fetch(request)
            const json = await response.json();
            if (json.hasOwnProperty("data")){
              signIn(json);
              const object = JSON.stringify(json.data);
              // Toast.show({type: "success", text1: json.message});
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
    const onsubmit = () => {
      if (Validations.EmailValidation(emailId) || Validations.PasswordValidation(password)){
        setShowErrMsg(true);
      }
      else{
        setShowErrMsg(false);
        showLoader();
        LoginApi();
      }
    }
    useEffect(() => {
      setShowErrMsg(false);
  }, []);

    return(
      <OverlayContainer>
            <AppBackgorund />
            <KeyboardAwareView doNotForceDismissKeyboardWhenLayoutChanges={true} animated={true}>
        <View style={{padding: 16, marginTop: 80, justifyContent: "center"}}>
            <Text style={AuthStyle.viewTitile}>Login</Text>
            <View style={AuthStyle.CardmainContainer}> 
                <Text style={CustomStyling.containerTitle}>Opayn HRMS</Text>
                
                <FloatTextField 
                    placeholder="Enter Email"
                    defaultValue={emailId}
                    pickerLabel={strings.email}
                    onTextChange={(val) => setEmail(val)}
                    showError={(showErrMsg && Validations.EmailValidation(emailId)) ? true : false}
                    errorText={Validations.EmailValidation(emailId)}
                />
                <FloatTextField 
                    placeholder="Enter Password"
                    defaultValue={password}
                    pickerLabel={strings.password}
                    onTextChange={(val) => setPswrd(val)}
                    isPasswordField={true}
                    showError={(showErrMsg && Validations.PasswordValidation(password)) ? true : false}
                    errorText={Validations.PasswordValidation(password)}
                />
                
                <MainButton 
                    text='Login'
                    onPress={() => {onsubmit()}}
                />
               
                <TextButton 
                  text='Forgot Password?'
                  onPress={() => {
                    navigation.navigate('Forget');
                  }}
                  textStyle={{alignSelf: "flex-end", marginVertical: 16}}
                />
                
            </View>
            <View style={{padding:0, flexDirection:"row", alignItems:"center", alignSelf:"center"}}>
              <Text style={CustomStyling.regular16Text}>Request for Approval </Text>
                <TextButton 
                  text='Request'
                  onPress={() => {
                    navigation.navigate('ContactAdmin');
                  }}
                  
                />
            </View>
        </View>
        </KeyboardAwareView>
        </OverlayContainer>
    );
};

export default LoginView;