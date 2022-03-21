import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import Toast from "react-native-toast-message";
import { LoaderContext } from "../utils/context";
import { apiCall } from "../utils/httpClient";
import apiEndPoints from "../utils/apiEndPoints";
import FloatTextField from "../helper/FloatTextField";
import { MainButton } from "../components/mainButton";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";

const ChangePasswordView = ({navigation = useNavigation()}) => {

    const [formData, setFormData] = useState({});
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const [showErrMsg, setShowErrMsg] = useState(false);
      
    const ChangePasswordApi = async() => {
      let param = {
        old_password: formData.CurrentPswrd,
        new_password: formData.NewPswrd,
      }
      try {
              const {data} = await apiCall("POST", apiEndPoints.ChangePassword, param);
              if (data.hasOwnProperty("data")){
                Toast.show({type: "success", text1: data.message});
                navigation.goBack();
              }
              else{
                Toast.show({type: "error", text1: data.message});
              }
          } catch (error) {
              console.error("ERR: "+error);
              Toast.show({type: "error", text1: error});
          } finally {
              hideLoader()
          }
  };

    const onsubmit = () => {
      if (Validations.PasswordValidation(formData?.CurrentPswrd) || Validations.PasswordValidation(formData?.NewPswrd) || formData?.ConfirmPswrd != formData?.NewPswrd){
          setShowErrMsg(true);
      }
      else{
        setShowErrMsg(false);
        showLoader();
        ChangePasswordApi();
      }
    };

    const onTextChange = (key, value) => {
      var data = {...formData};
      data[key] = value;
      setFormData(data);
    };

    useEffect(() => {
      setShowErrMsg(false);
    }, []);
    
    return(
      <OverlayContainer>
            <AppBackgorund />
            <KeyboardAwareView doNotForceDismissKeyboardWhenLayoutChanges={true} animated={true}>
        <View style={{padding: 16, marginTop: 80, justifyContent: "center"}}>
            <Text style={AuthStyle.viewTitile}>Change Password</Text>
            <View style={[AuthStyle.CardmainContainer]}> 
               
                <FloatTextField 
                    placeholder="Enter Current Password"
                    // defaultValue={password}
                    pickerLabel="Current Password"
                    onTextChange={(val) => onTextChange('CurrentPswrd', val)}
                    isPasswordField={true}
                    showError={(showErrMsg && Validations.PasswordValidation(formData?.CurrentPswrd))}
                    errorText={Validations.PasswordValidation(formData?.CurrentPswrd)}
                />
                <FloatTextField 
                    placeholder="Enter New Password"
                    // defaultValue={password}
                    pickerLabel="New Password"
                    onTextChange={(val) => onTextChange('NewPswrd', val)}
                    isPasswordField={true}
                    showError={(showErrMsg && Validations.PasswordValidation(formData?.NewPswrd))}
                    errorText={Validations.PasswordValidation(formData?.NewPswrd)}
                />
                <FloatTextField 
                    placeholder="Re-Enter New Password"
                    // defaultValue={}
                    pickerLabel="Confirm New Password"
                    onTextChange={(val) => onTextChange('ConfirmPswrd', val)}
                    isPasswordField={true}
                    showError={(showErrMsg && formData?.ConfirmPswrd != formData?.NewPswrd)}
                    errorText={"Please enter confirm password same as new password"}
                />
                <MainButton
                  text={'Change Password'}
                  onPress={() => {onsubmit()}}
                />
                
            </View>
        </View>
        </KeyboardAwareView>
      </OverlayContainer>
    );
};

export default ChangePasswordView;
