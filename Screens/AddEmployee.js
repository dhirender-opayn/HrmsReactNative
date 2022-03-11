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
import DropDownPicker from "../helper/DropDownPicker";
import ImagesPath from "../images/ImagesPath";
import FloatTextField from "../helper/FloatTextField";
import { MainButton } from "../components/mainButton";

const AddEmployee = ({navigation = useNavigation()}) => {
    const [userdata, setUserData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(false);
    const [isLoad, setLoad] = useState(false);
    const toast = useToast();
    const [formData, setFormData] = useState({});
    const [showPickerModal, setShowPicker] = useState(false);
    const [selectdImageData, setSelectedImgData] = useState({});
    const [rolesData, setRolesData] = useState([]);
    const [empRole, setEmpRole] = useState('');
    const [empRoleID, setEmpRoleId] = useState();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    const getRolesData = async() => {
        try {
                const {data} = await apiCall("GET", apiEndPoints.Roles);
                console.log("Data: "+data);
                setRolesData(data.data);
            } catch (error) {
                console.error("ERR: "+error);
                toast.show(error, { duration: 3000 })
            } finally {
                setLoading(false);
                hideLoader();
            }
    };

    let form = new FormData();
    const AddUserProfile = async() => {
       // var param = {};
       form.append('name', formData.name );
       form.append('email', formData.email );
       form.append('mobile', formData.mobile );
       form.append('password', formData.password );
       form.append('role_id', empRoleID);
        if (selectdImageData.path != null || selectdImageData.path != undefined){
           
            form.append('image', {
              uri: Platform.OS === 'android' ? `file:///${selectdImageData/path}` : selectdImageData.path,
              type: 'image/jpeg',
              name: "HRMS-"+new Date().getUTCMilliseconds()+".jpeg",
            } );
        }
        console.log(form);
        const request = new Request(Global.projct.ios.BASE_URL+apiEndPoints.addUser, {method: 'POST', headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userdata.token}`
          }, body: form});
          try{
              const response = await fetch(request)
              const json = await response.json();
              console.log(json);
              toast.show(json.message, {duration:4000});
          } catch (error) {
          console.error(error);
          toast.show(error, {duration: 3000})
          } finally {
          hideLoader();
          }
      };

    const onsubmit = () => {
      if (Validations.NameValidation((formData.name === undefined) ? '' : formData.name)){
        toast.show(Validations.NameValidation((formData.name === undefined) ? '' : formData.name), {duration: 3000});
      }
      else if (Validations.EmailValidation((formData.email === undefined) ? '' : formData.email)){
        toast.show(Validations.EmailValidation((formData.email === undefined) ? '' : formData.email), {duration: 3000});
      }
      else if (Validations.MobileValidation((formData.mobile === undefined) ? '' : formData.mobile)){
        toast.show(Validations.MobileValidation((formData.mobile === undefined) ? '' : formData.mobile), {duration: 3000});
      }
      else if (Validations.PasswordValidation((formData.password === undefined) ? '' : formData.password)){
        toast.show(Validations.PasswordValidation((formData.password === undefined) ? '' : formData.password), {duration: 3000});
      }
      else if (empRoleID == null){
          toast.show("Please select role", {duration: 3000});
      }
      else{
        showLoader();
        AddUserProfile();
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
       
         .then((I) => {
          setShowPicker(false);
          console.log(I);
          setSelectedImgData(I);
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
         .then((I) => {
          setShowPicker(false);
          setSelectedImgData(I);
         })
         .catch((error) => {
          setShowPicker(false);
         });
     };

     useEffect(() => {
       showLoader();
         getRolesData();
     }, []);

    return(
      <OverlayContainer>
            <AppBackgorund />
      <ScrollView>
          {(isLoad) ? <ActivityIndicator /> :
          (//<OverlayContainer>
          
        <View style={{padding: 16, zIndex: 50, justifyContent: "center"}}>
            <View style={[AuthStyle.CardmainContainer, {zIndex: 100}]}> 
                <Text style={CustomStyling.containerTitle}>Add User</Text>
                { (selectdImageData.path != null || selectdImageData.path != undefined) ?
                 (<Image 
                  source={{
                      uri: selectdImageData.path,
                      //method: 'GET'
                  }}
                  style={[CustomStyling.editImageView, {marginTop: 16}]}
                  />) :
                  
                    (<Image 
                        source={require('../images/userwhite.png')}
                        style={[CustomStyling.editImageView, {marginTop: 16}]}
                    />)
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
                    pickerLabel="Name"
                    onTextChange={(val) => onTextChange("name", val)}
                    leftImagePath={ImagesPath.activeUserImg}
                    containerStyle={{marginTop: 32}}
                />
                
                <FloatTextField 
                    placeholder="Enter Email"
                    pickerLabel="Email"
                    onTextChange={(val) => onTextChange("email", val)}
                    leftImagePath={ImagesPath.emailImg}
                />
               
                <FloatTextField 
                    placeholder="Enter Mobile"
                    pickerLabel="Mobile"
                    onTextChange={(val) => onTextChange("mobile", val)}
                    leftImagePath={ImagesPath.phoneImg}
                />

                <FloatTextField 
                    placeholder="Enter Password"
                    pickerLabel="Password"
                    onTextChange={(val) => onTextChange("password", val)}
                    leftImagePath={ImagesPath.lockImg}
                    isPasswordField={true}
                />
                <DropDownPicker
                            containerStyle={AuthStyle.inputText}
                            //style={{marginTop: opened ? 175 : 20}}
                            nestedScroll={false}
                            pickerdrop={{height: 140}}
                            pickerPlaceholder={"Select Role"}
                            pickerData={rolesData}
                            value={empRole}
                            passID={(val) => {
                                setEmpRoleId(val)
                            }}
                            onSelectValue={(text) => setEmpRole(text)}
                        />
            </View>
           
                <MainButton 
                  text={'Add User'}
                  onPress={() => {onsubmit();}}
                  viewStyle={{marginHorizontal: 24, marginBottom: 32}}
                />
        </View>
      
        )}
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

export default AddEmployee;

