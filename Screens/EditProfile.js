import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput,  Button, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from "react-native";
import  Colors, { color }  from "../Common/Colors";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import { LoaderContext, UserContext } from "../utils/context";
import ImagePicker from "react-native-image-crop-picker";
import PopUpModal from "../helper/PopUpModal";
import { apiCall } from "../utils/httpClient";
import apiEndPoints from "../utils/apiEndPoints";

const EditProfileView = ({navigation = useNavigation()}) => {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const [userdata, setUserData] = useContext(UserContext);
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState({});
    const [showPickerModal, setShowPicker] = useState(false);
    const [selectdImageData, setSelectedImgData] = useState({});
    const { showLoader, hideLoader } = useContext(LoaderContext);

  
    let form = new FormData()
    const UpdateProfile = async() => {
       // var param = {};
       form.append('id', userdata.user.id );
       form.append('name', (formData.name === undefined) ? userdata.user.name : formData.name );
       form.append('email', userdata.user.email );
       form.append('mobile', (formData.mobile === undefined) ? userdata.user.mobile : formData.mobile );
       form.append('clockify_key', (formData.clockifyKey === undefined) ? userdata.user.profile.clockify_key : formData.clockifyKey );
        if (selectdImageData?.uri != null || selectdImageData.uri != undefined){
            form.append('image', selectdImageData );
        }
        const request = new Request(Global.projct.ios.BASE_URL+apiEndPoints.UpdatePropfile, {method: 'POST', headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userdata.token}`
          }, body: form});
          try{
              const response = await fetch(request)
              const json = await response.json();
              var updatedData = {...userdata};
              updatedData["user"] = {...json.data.user};
              setUserData(updatedData);
                toast.show(json.message, {duration:4000});
            
              
          } catch (error) {
          console.error(error);
          toast.show(error, {duration: 3000})
          } finally {
            hideLoader();
          setLoading(false);
          }
      };

    const onsubmit = () => {
      if (Validations.NameValidation((formData.name === undefined) ? userdata.user.name : formData.name)){
        toast.show(Validations.NameValidation((formData.name === undefined) ? userdata.user.name : formData.name), {duration: 3000});
      }
      else if (Validations.MobileValidation((formData.mobile === undefined) ? userdata.user.mobile : formData.mobile)){
        toast.show(Validations.MobileValidation((formData.mobile === undefined) ? userdata.user.mobile : formData.mobile), {duration: 3000});
      }
      else if (Validations.FieldValidation((formData.clockifyKey === undefined) ? userdata.user.profile.clockify_key : formData.clockifyKey)){
        toast.show(Validations.EmptyFieldStr("clockify key"), {duration: 3000});
      }
      else{
        setLoading(true);
        showLoader();
        UpdateProfile();
      }
    };
    
    
    const onTextChange = (key, value) => {
      var data = {...formData};
      data[key] = value;
      setFormData(data);
    };

    const openImagePicker = () => {
       ImagePicker.openPicker({
        
         cropping: true,
         includeBase64: true,
       })
       
         .then((ImgData) => {
          setShowPicker(false);
          setSelectedImgData({ uri: ImgData.path,
          type: 'image/jpeg',
          name: "HRMS-"+new Date().getUTCMilliseconds()+".jpeg",});
         })
         .catch((error) => {     
          setShowPicker(false);
         });
      
     };
   
     const openCamera = () => {
       ImagePicker.openCamera({

         cropping: true,
         includeBase64: true,
       })
         .then((ImgData) => {
          setShowPicker(false);
          setSelectedImgData({ uri: ImgData.path,
          type: 'image/jpeg',
          name: "HRMS-"+new Date().getUTCMilliseconds()+".jpeg",});
          
         })
         .catch((error) => {
          setShowPicker(false);
         });
     };

    return(
      <OverlayContainer>
            <AppBackgorund />
      <ScrollView>
        <View style={{padding: 16, marginTop: 40, justifyContent: "center"}}>
            <View style={AuthStyle.CardmainContainer}> 
                
                { (selectdImageData.uri != null || selectdImageData.uri != undefined) ?
                 (<Image 
                  source={{
                      uri: selectdImageData.uri,
                      //method: 'GET'
                  }}
                  style={CustomStyling.editImageView}
                  />) :
                  ((userdata.user.profile.image != null) ? 
                                (<Image 
                                source={{
                                    uri: userdata.user.profile.image,
                                    method: 'GET'
                                }}
                                style={CustomStyling.editImageView}
                                />)
                                :
                                (<Image 
                                source={require('../images/userwhite.png')}
                                style={CustomStyling.editImageView}
                                />))
                            }
                <TouchableOpacity onPress={() => {
                    //navigation.navigate('picker');
                    setShowPicker(true);
                    }}
                    style={CustomStyling.editImageBtn}>
                    <Image source={require("../images/camera.png")}
                        style={CustomStyling.camerImageStyle}
                    />
                </TouchableOpacity>
                <TextInput
                    style={[AuthStyle.inputText, {marginTop: 32}]}
                    placeholder="Name"
                    defaultValue={userdata.user.name}
                    onChangeText={(val) => onTextChange("name", val)}
                />
                <TextInput
                    style={AuthStyle.inputText}
                    placeholder="Email"
                    defaultValue={userdata.user.email}
                    editable={false}
                    onChangeText={(val) => onTextChange("email", val)}
                />
                <TextInput
                    style={AuthStyle.inputText}
                    keyboardType='phone-pad'
                    placeholder="Mobile"
                    defaultValue={userdata.user.mobile}
                    onChangeText={(val) => onTextChange("mobile", val)}

                />
                <TextInput
                    style={AuthStyle.inputText}
                    placeholder="Clockify Key"
                    editable={(userdata.user.profile.clockify_key != null) ? false : true}
                    defaultValue={userdata.user.profile.clockify_key}
                    onChangeText={(val) => onTextChange("clockifyKey", val)}
                />
                
            </View>
            <TouchableOpacity onPress={() => {
                onsubmit();
                //navigation.navigate('User');
            }}>
                  <View style={{backgroundColor:Colors.color.red, borderRadius: 16, height: 50, justifyContent: "center", alignItems: "center", margin: 24}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: '#fff'}}>Save</Text>
                    {isLoading ? <ActivityIndicator /> : null}
                  </View>
                </TouchableOpacity>
        </View>
      
        
        {showPickerModal && (
        <PopUpModal
          onPressCamera={openCamera}
          onPressGallery={openImagePicker}
          onPressCancel={() => setShowPicker(false)}
        />
      )}
        {/* {(selectImage) ? <ImagePickerView selectImage={selectedImage}/> : null} */}
        </ScrollView>
        </OverlayContainer>
    );
};

export default EditProfileView;

