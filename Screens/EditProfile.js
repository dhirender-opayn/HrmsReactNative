import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput,  Button, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from "react-native";
import  Colors, { color }  from "../Common/Colors";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import ImagePickerView from "./ImagePickerView";

const EditProfileView = ({navigation = useNavigation()}) => {
    const [isLoading, setLoading] = useState(false);
    const [isLoad, setLoad] = useState(true);
    const [name, setName] = useState("");
    const [emailId, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [clockifyKey, setKey] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMsg] = useState("");
    const [data, setData] = useState({});
    const toast = useToast();
    const [userdata, setUserData] = useState({});
    const [token, setToken] = useState('');
    const [selectImage, setselectImage] = useState(false);
    const [profileUrl, setPUrl] = useState('');
    const selectedImage = useState({});
   var detail =  "";
   const [deail, setDetail] = useState("");
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
            setMsg(json.message);
             //setData(json.data);

             toast.show(json.message, {duration: 4000});
            
            //  navigation.goBack();
        } catch (error) {
        console.error(error);
        toast.show(error, {duration: 3000})
        } finally {
        setLoading(false);
        }
    };
    const onsubmit = () => {
      if (Validations.NameValidation(name)){
        toast.show(Validations.NameValidation(name), {duration: 3000});
      }
      else if (Validations.EmailValidation(emailId)){
        toast.show(Validations.EmailValidation(emailId), {duration: 3000});
      }
      else if (Validations.MobileValidation(mobile)){
        toast.show(Validations.MobileValidation(mobile), {duration: 3000});
      }
      else if (Validations.SubjectValidation(subject)){
        toast.show(Validations.SubjectValidation(subject), {duration: 3000});
      }
      else if (Validations.DescriptonValidation(description)){
        toast.show(Validations.DescriptonValidation(description), {duration: 3000});
      }
      else{
        setLoading(true);
        ContactAdminAPI();
      }
    };
    const retrieveData = async() => {
        try{
            detail =  await AsyncStorage.getItem('userData');
            console.log(detail);
            setDetail(detail)
            let data = JSON.parse(detail);
            setUserData(data);
            setToken(data.token)
            if (data.user.profile.image != null && data.user.profile.image != ""){
            setPUrl(data.user.profile.image);
            }
        }
        catch (error){
            console.error(error);
        }
        finally{
            setLoad(false);
        }
    };
    useEffect(() =>{ 
        retrieveData();
    }, []);
    useEffect(() =>{ 
        if (selectedImage.hasOwnProperty('assets')){
        setPUrl(selectedImage.assets[0].uri);
        }
    }, [selectedImage]);
    return(
      <OverlayContainer>
            <AppBackgorund />
      <ScrollView>
          {(isLoad) ? <ActivityIndicator /> :
          (//<OverlayContainer>
          
        <View style={{padding: 16, marginTop: 80, justifyContent: "center"}}>
            <View style={AuthStyle.CardmainContainer}> 
                {(profileUrl != "" && profileUrl != null) ? 
                    (<Image 
                                source={{
                                    uri: {profileUrl}//selectedImage.assets[0].uri,//userdata.user.profile.image,
                                   //method: 'GET'
                                }}
                                style={CustomStyling.editImageView}
                    />)
                    :
                    (<Image 
                                source={require('../images/userwhite.png')}
                                style={CustomStyling.editImageView}
                    />)
                }
                <TouchableOpacity onPress={() => {
                    //navigation.navigate('picker');
                    setselectImage(true);
                    }}
                    style={CustomStyling.editImageBtn}>
                    <Image source={require("../images/camera.png")}
                        style={{height:32, width:32}}
                    />
                </TouchableOpacity>
                <TextInput
                    style={[AuthStyle.inputText, {marginTop: 20}]}
                    placeholder="Name"
                    onChangeText={Id => setName(Id)}
                    defaultValue={name}
                />
                <TextInput
                    style={AuthStyle.inputText}
                    placeholder="Email"
                    onChangeText={pswrd => setEmail(pswrd)}
                    defaultValue={emailId}
                />
                <TextInput
                    style={AuthStyle.inputText}
                    keyboardType='phone-pad'
                    placeholder="Mobile"
                    onChangeText={mobile => setMobile(mobile)}
                    defaultValue={mobile}
                />
                <TextInput
                    style={AuthStyle.inputText}
                    placeholder="Clockify Key"
                    onChangeText={key => setKey(key)}
                    defaultValue={clockifyKey}
                />
                
                <TouchableOpacity onPress={() => {
                    if (selectedImage.hasOwnProperty('assets')){
                        setPUrl(selectedImage.assets[0].uri);
                        }
                        console.log(selectedImage);
                 // onsubmit()
                //navigation.navigate('User');
                }}>
                  <View style={{backgroundColor:Colors.color.red, borderRadius: 16, height: 50, justifyContent: "center", alignItems: "center", marginVertical: 12}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: '#fff'}}>Make Request</Text>
                    {isLoading ? <ActivityIndicator /> : null}
                  </View>
                </TouchableOpacity>
                
            </View>
            
        </View>

       //</ScrollView> <Text>Gekn</Text>
        // /* {(userdata.user.profile.image != null) ? 
        //                         (<Image 
        //                         source={{
        //                             uri: userdata.user.profile.image,
        //                             method: 'GET'
        //                         }}
        //                         style={{width:80, height: 80, borderRadius: 40, marginTop: 40}}
        //                         />)
        //                         :
        //                         (<Image 
        //                         source={require('../images/userwhite.png')}
        //                         style={{width:80, height: 80, borderRadius: 40, marginTop: 40}}
        //                         />)
        //                     } */
       // </OverlayContainer>
        )}
        {(selectImage) ? <ImagePickerView selectImage={selectedImage}/> : null}
        </ScrollView>
        {/* {(selectImage) ? <ImagePickerView /> : null} */}
        </OverlayContainer>
    );
};

export default EditProfileView;

