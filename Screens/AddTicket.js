import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput,  Button, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import  Colors  from "../Common/Colors";
import Validations from "../Common/Validations";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";
import { LoaderContext, UserContext } from "../utils/context";
import apiEndPoints from "../utils/apiEndPoints";
import { apiCall } from "../utils/httpClient";
import FloatTextField from "../helper/FloatTextField";
import { MainButton } from "../components/mainButton";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";

const AddTicketView = ({navigation = useNavigation()}) => {
    const [formData, setFormData] = useState({});
    const toast = useToast();
    const [userdata, setUserData] = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    
    const addTicket = async() => {
      let param = {
        user_id: userdata.user.id,
        name: userdata.user.name,
        email: userdata.user.email,
        mobile: userdata.user.mobile,
        subject:formData.title,
        description: formData.description,
      }
      try {
              const {data} = await apiCall("POST", apiEndPoints.AddTicket, param);
              toast.show(data.message, {duration: 4000});
              navigation.goBack();
          } catch (error) {
              console.error("ERR: "+error);
              toast.show(error, { duration: 3000 })
          } finally {
              hideLoader();
          }
  };
    const onsubmit = () => {
      if (Validations.FieldValidation((formData.title == undefined) ? "" : formData.title)){
        toast.show(Validations.EmptyFieldStr("title"), {duration: 3000});
      }
      else if (Validations.FieldValidation((formData.description == undefined) ? "" : formData.description)){
        toast.show(Validations.EmptyFieldStr("description"), {duration: 3000});
      }
      else{
        showLoader();
        addTicket();
      }
    }

    const onTextChange = (key, value) => {
      var data = {...formData};
      data[key] = value;
      setFormData(data);
    };
    
    return(
      <OverlayContainer>
            <AppBackgorund />
            <KeyboardAwareView doNotForceDismissKeyboardWhenLayoutChanges={true} animated={true}>
              <View style={{padding: 16, marginTop: 40, justifyContent: "center"}}>
                  <View style={AuthStyle.CardmainContainer}> 
                      <Text style={CustomStyling.containerTitle}>Add Ticket</Text>
                      
                      <FloatTextField 
                        placeholder="Enter Title"
                        pickerLabel="Title"
                        onTextChange={(val) => onTextChange('title', val)}
                      />
                    
                      <FloatTextField 
                        placeholder="Enter Description"
                        pickerLabel="Description"
                        onTextChange={(val) => onTextChange('description', val)}
                        textInputMultiline={true}
                        containerStyle={{height: 250}}
                        textInputStyle={{height: 250}}
                      />
                      
                      <MainButton 
                        text={'Add Ticket'}
                        onPress={() => {onsubmit()}}
                      />
                      
                  </View>
              </View>
            </KeyboardAwareView>
        </OverlayContainer>
    );
};

export default AddTicketView;