import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Global, { projct } from "../Common/Global";
import { View, TouchableOpacity, ScrollView, Image } from "react-native";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import Toast from "react-native-toast-message";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import { LoaderContext, UserContext } from "../utils/context";
import ImagePicker from "react-native-image-crop-picker";
import PopUpModal from "../helper/PopUpModal";
import apiEndPoints from "../utils/apiEndPoints";
import FloatTextField from "../helper/FloatTextField";
import { MainButton } from "../components/mainButton";
import { strings } from "../Common/String";

const EditProfileView = ({navigation = useNavigation()}) => {
    const [isLoading, setLoading] = useState(false);
    const [userdata, setUserData] = useContext(UserContext);
    const [formData, setFormData] = useState({});
    const [imageData, setImageData] = useState({});
    const [showPickerModal, setShowPicker] = useState(false);
    const [selectdImageData, setSelectedImgData] = useState({});
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const [showErrMsg, setShowErrMsg] = useState(false);
  
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
              if (json.hasOwnProperty("data")){
                if (json.data.hasOwnProperty("user")){
                  var updatedData = {...userdata};
                  updatedData["user"] = {...json.data.user};
                  setUserData(updatedData);
                  Toast.show({type: "success", text1: json.message});
                }
                else{
                  Toast.show({type: "error", text1: json.message});
                }
              }
              else{
                Toast.show({type: "error", text1: json.message});
              }
            
          } catch (error) {
            console.error(error);
            Toast.show({type: "error", text1: error})
          } finally {
            hideLoader();
          setLoading(false);
          }
      };

    const onsubmit = () => {
      if (Validations.NameValidation(formData.name) || Validations.MobileValidation(formData.mobile) || Validations.FieldValidation(formData.clockifyKey)){
        setShowErrMsg(true);
      }
      else{
        setShowErrMsg(false);
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
          name: strings.uniqueFileName+".jpeg",});
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
          name: strings.uniqueFileName+".jpeg",}
        );  
      })
      .catch((error) => {
        setShowPicker(false);
      });
    };

    const setPrevData = () => {
      var data = {...formData};
      data["name"] = userdata.user.name;
      data["email"] = userdata.user.email;
      data["mobile"] = userdata.user.mobile;
      data["clockifyKey"] = userdata.user.profile.clockify_key;
      setFormData(data);
      setShowErrMsg(false);
    };

     useEffect(() => {setPrevData();}, []);

    return(
      <OverlayContainer>
            <AppBackgorund />
      <ScrollView>
        <View style={{padding: 16, marginTop: 80, justifyContent: "center"}}>
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
                      />)
                  )
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
                
                <FloatTextField 
                    placeholder="Enter Name"
                    defaultValue={userdata.user.name}
                    pickerLabel="Name"
                    onTextChange={(val) => onTextChange("name", val)}
                    showError={(showErrMsg && Validations.NameValidation(formData.name))}
                    errorText={Validations.NameValidation(formData.name)}
                    containerStyle={{marginTop: 32}}
                />
                
                <FloatTextField 
                    placeholder="Enter Email"
                    defaultValue={userdata.user.email}
                    pickerLabel="Email"
                    editable={false}
                    onTextChange={(val) => onTextChange("email", val)}
                />
               
                <FloatTextField 
                    placeholder="Enter Mobile"
                    defaultValue={userdata.user.mobile}
                    pickerLabel="Mobile"
                    keyboardType="phone-pad"
                    onTextChange={(val) =>onTextChange("mobile", val)}
                    showError={(showErrMsg && Validations.MobileValidation(formData.mobile))}
                    errorText={Validations.MobileValidation(formData.mobile)}
                />
               
                <FloatTextField 
                    placeholder="Enter Clockify Key"
                    defaultValue={formData.clockifyKey}
                    pickerLabel="Clockify Key"
                    onTextChange={(val) => onTextChange("clockifyKey", val)}
                    showError={(showErrMsg && Validations.FieldValidation(formData.clockifyKey))}
                    errorText={Validations.EmptyFieldStr("clockify key")}
                />
                
            </View>
           
                <MainButton 
                  text="Save"
                  onPress= {() => {onsubmit();}}
                  viewStyle={{marginHorizontal: 24}}
                />
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

