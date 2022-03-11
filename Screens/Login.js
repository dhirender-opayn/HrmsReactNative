import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text } from "react-native";
import  Colors  from "../Common/Colors";
import Validations from "../Common/Validations";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";
import { AuthContext, LoaderContext } from "../utils/context";
import FloatTextField from "../helper/FloatTextField";
import { MainButton } from "../components/mainButton";
import { TextButton } from "../components/TextButton";
import { CustomStyling } from "../CustomStyle/CustomStyling";

const LoginView = ({navigation = useNavigation()}) => {
    const [emailId, setEmail] = useState("simran.sharma@opayn.com");
    const [password, setPswrd] = useState("123456");
    const { showLoader, hideLoader } = useContext(LoaderContext);

    const toast = useToast();
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
            console.log(json.data)
            signIn(json);
            const object = JSON.stringify(json.data);
           // setEmail(json)
            await AsyncStorage.setItem('userData',object);
            // navigation.navigate('TabView');
            }
            else{
              toast.show(json.message, {duration:4000});
            }
            
        } catch (error) {
          console.error(error);
          toast.show(error, {duration: 3000});
        } finally {
          hideLoader();
        }
    };
    const onsubmit = () => {
      if (Validations.EmailValidation(emailId)){
        toast.show(Validations.EmailValidation(emailId), {duration: 3000});
        return
      }
        if (Validations.PasswordValidation(password)){
        toast.show(Validations.PasswordValidation(password), {duration: 3000});
        return
      }
      else{
        showLoader();
        LoginApi();
      }
    }
    return(
      <OverlayContainer>
            <AppBackgorund />
        <View style={{padding: 16, marginTop: 80, justifyContent: "center"}}>
            <Text style={AuthStyle.viewTitile}>Login</Text>
            <View style={AuthStyle.CardmainContainer}> 
                <Text style={CustomStyling.containerTitle}>Opayn HRMS</Text>
                
                <FloatTextField 
                    placeholder="Enter Email"
                    defaultValue={emailId}
                    pickerLabel="Email"
                    onTextChange={(val) => setEmail(val)}
                />
                <FloatTextField 
                    placeholder="Enter Password"
                    defaultValue={password}
                    pickerLabel="Password"
                    onTextChange={(val) => setPswrd(val)}
                    isPasswordField={true}
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
        </OverlayContainer>
    );
};

export default LoginView;