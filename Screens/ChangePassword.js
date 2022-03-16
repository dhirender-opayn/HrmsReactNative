import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";
import { LoaderContext } from "../utils/context";
import { apiCall } from "../utils/httpClient";
import apiEndPoints from "../utils/apiEndPoints";
import FloatTextField from "../helper/FloatTextField";
import { MainButton } from "../components/mainButton";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";

const ChangePasswordView = ({navigation = useNavigation()}) => {
    const toast = useToast();
    const [formData, setFormData] = useState({});
    const { showLoader, hideLoader } = useContext(LoaderContext);

      
    const ChangePasswordApi = async() => {
      let param = {
        old_password: formData.CurrentPswrd,
        new_password: formData.NewPswrd,
      }
      try {
              const {data} = await apiCall("POST", apiEndPoints.ChangePassword, param);
              toast.show(data.message, {duration: 4000});
              navigation.goBack();
          } catch (error) {
              console.error("ERR: "+error);
              toast.show(error, { duration: 3000 })
          } finally {
              hideLoader()
          }
  };

    const onsubmit = () => {
      if (Validations.PasswordValidation((formData.CurrentPswrd == undefined) ? "" : formData.CurrentPswrd)){
        toast.show("Please enter valid current password", {duration: 3000});
      }
      else if (Validations.PasswordValidation((formData.NewPswrd == undefined) ? "" : formData.NewPswrd)){
        toast.show("Please enter valid new password", {duration: 3000});
      }
      else if (formData.ConfirmPswrd == undefined || formData.ConfirmPswrd != formData.NewPswrd){
          toast.show("Please enter confirm password same as new password", {duration: 3000});
      }
      else{
        showLoader();
        ChangePasswordApi();
      }
    };

    const onTextChange = (key, value) => {
      var data = {...formData};
      data[key] = value;
      setFormData(data);
    };
    
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
                />
                <FloatTextField 
                    placeholder="Enter New Password"
                    // defaultValue={password}
                    pickerLabel="New Password"
                    onTextChange={(val) => onTextChange('NewPswrd', val)}
                    isPasswordField={true}
                />
                <FloatTextField 
                    placeholder="Re-Enter New Password"
                    // defaultValue={}
                    pickerLabel="Confirm New Password"
                    onTextChange={(val) => onTextChange('ConfirmPswrd', val)}
                    isPasswordField={true}
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
