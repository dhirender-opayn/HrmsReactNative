import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, ScrollView } from "react-native";
import  Colors  from "../Common/Colors";
import Validations from "../Common/Validations";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import Toast from "react-native-toast-message";
import { LoaderContext, UserContext } from "../utils/context";
import apiEndPoints from "../utils/apiEndPoints";
import { apiCall } from "../utils/httpClient";
import FloatTextField from "../helper/FloatTextField";
import { MainButton } from "../components/mainButton";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";

const AddAnnouncementView = ({navigation = useNavigation()}) => {
    const [formData, setFormData] = useState({});
    const [showErrMsg, setShowErrMsg] = useState(false);
    const [userdata, setUserData] = useContext(UserContext);
    const [isLoad, setLoad] = useState(false);
    const { showLoader, hideLoader } = useContext(LoaderContext);

    
    const addAnnouncement = async() => {
    //   let param = {
    //     user_id: userdata.user.id,
    //     name: userdata.user.name,
    //     email: userdata.user.email,
    //     mobile: userdata.user.mobile,
    //     subject:formData.title,
    //     description: formData.description,
    //   }
    //   try {
    //           const {data} = await apiCall("POST", apiEndPoints.AddTicket, param);
    //           console.log("Data: "+data);
    //           Toast.show({type: "error", text1: data.message});
    //           navigation.goBack();
    //       } catch (error) {
    //           console.error("ERR: "+error);
    //           Toast.show({type: "error", text1: error});
    //       } finally {
    //           setLoad(false);
    //       }
  };
    const onsubmit = () => {
      if (Validations.FieldValidation(formData?.title) || Validations.FieldValidation(formData?.description)){
        setShowErrMsg(true);
      }
      else{
        setShowErrMsg(false);
        //setLoad(true);
        addAnnouncement();
      }
    }

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
        <ScrollView>
        <View style={{padding: 16, marginTop: 40, justifyContent: "center"}}>
            <View style={AuthStyle.CardmainContainer}> 
                <Text style={CustomStyling.containerTitle}>
                    Add Announcement
                </Text>
                
                <FloatTextField 
                  placeholder="Enter Title"
                  pickerLabel="Title"
                  onTextChange={(val) => onTextChange('title', val)}
                  showError={(showErrMsg && Validations.FieldValidation(formData.title))}
                  errorText={Validations.EmptyFieldStr("title")}
                />
               
                <FloatTextField 
                  placeholder="Enter Description"
                  pickerLabel="Description"
                  onTextChange={(val) => onTextChange('description', val)}
                  textInputMultiline={true}
                  containerStyle={{height: 250}}
                  textInputStyle={{height: 240}}
                  showError={(showErrMsg && Validations.FieldValidation(formData.description))}
                  errorText={Validations.EmptyFieldStr("description")}
                />
                
                <MainButton 
                  text={'Add Announcement'}
                  onPress={() => {onsubmit()}}
                />
                
            </View>
        </View>
        </ScrollView>
        </KeyboardAwareView>
        </OverlayContainer>
    );
};

export default AddAnnouncementView;