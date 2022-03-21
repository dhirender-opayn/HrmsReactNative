import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput,  Button, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import  Colors  from "../Common/Colors";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import Toast from "react-native-toast-message";
import FloatTextField from "../helper/FloatTextField";
import ImagesPath from "../images/ImagesPath";
import { MainButton } from "../components/mainButton";
import { TextButton } from "../components/TextButton";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import { LoaderContext } from "../utils/context";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";

const ContactAdminView = ({navigation = useNavigation()}) => {
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [emailId, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [showErrMsg, setShowErrMsg] = useState(false);
    const { showLoader, hideLoader } = useContext(LoaderContext);

    let formData = new FormData()
    
    const ContactAdminAPI = async() => {
      formData.append('user_id', '');
      formData.append('name', name)
      formData.append('email', emailId);
      formData.append('mobile', mobile);
      formData.append('subject', subject);
      formData.append('description', description);
      const request = new Request(Global.projct.ios.BASE_URL+Global.projct.apiSuffix.addTicket, {method: 'POST', headers: {
        Accept: 'application/json',
        }, body: formData});
        try{
            const response = await fetch(request)
            const json = await response.json();
            if (json.hasOwnProperty("data")){
              navigation.goBack();
              Toast.show({type: "success", text1: json.message});
            }
            else{
              Toast.show({type: "error", text1: json.message});
            }
        } catch (error) {
          console.error(error);
          Toast.show({type: "error", text1: error})
        } finally {
          setLoading(false);
          hideLoader()
        }
    };

    const onsubmit = () => {
      if (Validations.NameValidation(name) || Validations.EmailValidation(emailId) || Validations.MobileValidation(mobile) ||Validations.SubjectValidation(subject)
          || Validations.DescriptonValidation(description)){
        setShowErrMsg(true);
      }
      else{
        setShowErrMsg(false);
        setLoading(true);
        showLoader();
        ContactAdminAPI();
      }
    };

    useEffect(() => {
      setShowErrMsg(false);
    }, []);

    return(
      <OverlayContainer>
        <AppBackgorund />
        <KeyboardAwareView doNotForceDismissKeyboardWhenLayoutChanges={true} animated={true}>
          <ScrollView>
            <View style={{padding: 16, marginTop: 8, justifyContent: "center"}}>
                <Text style={AuthStyle.viewTitile}>Contact Admin</Text>
                <View style={AuthStyle.CardmainContainer}> 
                    
                    <FloatTextField 
                        placeholder="Enter Name"
                        defaultValue={name}
                        pickerLabel="Name"
                        onTextChange={(val) => setName(val)}
                        leftImagePath={ImagesPath.activeUserImg}
                        showError={(showErrMsg && Validations.NameValidation(name))}
                        errorText={Validations.NameValidation(name)}
                    />
                    
                    <FloatTextField 
                        placeholder="Enter Email"
                        defaultValue={emailId}
                        pickerLabel="Email"
                        onTextChange={(val) => setEmail(val)}
                        leftImagePath={ImagesPath.emailImg}
                        showError={(showErrMsg && Validations.EmailValidation(emailId))}
                        errorText={Validations.EmailValidation(emailId)}
                    />
                    
                    <FloatTextField 
                        placeholder="Enter Mobile"
                        defaultValue={mobile}
                        pickerLabel="Mobile"
                        onTextChange={(val) => setMobile(val)}
                        leftImagePath={ImagesPath.phoneImg}
                        showError={(showErrMsg && Validations.MobileValidation(mobile))}
                        errorText={Validations.MobileValidation(mobile)}
                    />
                  
                    <FloatTextField 
                        placeholder="Enter Subject"
                        defaultValue={subject}
                        pickerLabel="Subject"
                        onTextChange={(val) => setSubject(val)}
                        leftImagePath={ImagesPath.subjectImg}
                        showError={(showErrMsg && Validations.SubjectValidation(subject))}
                        errorText={Validations.SubjectValidation(subject)}
                    />
                    
                    <FloatTextField 
                        placeholder="Enter Description"
                        defaultValue={description}
                        pickerLabel="Description"
                        leftImagePath={ImagesPath.descriptionImg}
                        onTextChange={(val) => setDescription(val)}
                        textInputMultiline={true}
                        containerStyle={{height: 160}}
                        textInputStyle={{height: 150 }}
                        showError={(showErrMsg && Validations.DescriptonValidation(description))}
                        errorText={Validations.DescriptonValidation(description)}
                    />
                    
                    <MainButton 
                      text={'Make Request'}
                      onPress={() => onsubmit()}
                      viewStyle={{marginBottom: 12}}
                    />
                    <View style={{padding:0, flexDirection:"row", alignItems:"center", alignSelf:"center"}}>
                      <Text style={CustomStyling.regular16Text}>Already Approved </Text>
                      <TextButton 
                        text={'Login'}
                        onPress={() => {navigation.goBack();}}
                      />
                    </View>
                    
                </View>
                
            </View>
          </ScrollView>
        </KeyboardAwareView>
      </OverlayContainer>
    );
};

const styles = StyleSheet.create({
    TextfieldContainer: {
        height: 50, 
        borderWidth:1, 
        borderColor:Colors.color.lightGray, 
        borderRadius: 8, 
        padding: 8,
        marginBottom: 16,
        fontSize: 16
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    shadowContainerStyle: {   //<--- Style with elevation
     
      shadowColor: Colors.color.darkGray,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 3,
    },
    shadowBottonContainerStyle: {    //<--- Style without elevation
      borderWidth: 1,
      borderRadius: 16,
      borderColor: Colors.color.lightGray,
      borderBottomWidth: 1,
      //shadowColor: Colors.red,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 0,
      paddingVertical: 24, paddingHorizontal: 16, margin: 16
    },
});

export default ContactAdminView;