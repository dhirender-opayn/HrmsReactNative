import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Global, { projct } from "../Common/Global";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image } from "react-native";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import Toast from "react-native-toast-message";
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
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { strings } from "../Common/String";

const AddEmployee = ({navigation = useNavigation()}) => {
    const [userdata, setUserData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(false);
    const [isLoad, setLoad] = useState(false);
    const [showErrMsg, setShowErrMsg] = useState(false);
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
                if (data.hasOwnProperty("data")){
                  setRolesData(data.data);
                }
                else{
                  Toast.show({type: "error", text1: json.message})
                }
            } catch (error) {
                Toast.show({type: "error", text1: error})
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
              name: strings.uniqueFileName+".jpeg",
            } );
        }
        const request = new Request(Global.projct.ios.BASE_URL+apiEndPoints.addUser, {method: 'POST', headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userdata.token}`
          }, body: form});
          try{
              const response = await fetch(request)
              const json = await response.json();
              if (json.message.toLowerCase().includes("success")){
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
          hideLoader();
          }
      };

    const onsubmit = () => {
      if (Validations.NameValidation(formData?.name) || Validations.EmailValidation(formData?.email) || Validations.MobileValidation(formData?.mobile)
          || Validations.PasswordValidation(formData?.password) || empRoleID == null){
          setShowErrMsg(true);
      }
      else{
        setShowErrMsg(false);
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
       setShowErrMsg(false);
         getRolesData();
     }, []);

    return(
      <OverlayContainer>
        <AppBackgorund />
        <KeyboardAwareView doNotForceDismissKeyboardWhenLayoutChanges={true} animated={true}>
          <ScrollView>
            {(isLoad) ? <ActivityIndicator /> :
              (//<OverlayContainer>
              
            <View style={{padding: 16, zIndex: 50, justifyContent: "center"}}>
                <View style={[AuthStyle.CardmainContainer, {zIndex: 100, paddingVertical: 24}]}> 
                    <Text style={CustomStyling.containerTitle}>Add User</Text>
                    { (selectdImageData.path != null || selectdImageData.path != undefined) ?
                    (<Image 
                      source={{
                          uri: selectdImageData.path,
                          //method: 'GET'
                      }}
                      style={[CustomStyling.editImageView, {marginTop: -8}]}
                      />) :
                      
                        (<Image 
                            source={require('../images/userwhite.png')}
                            style={[CustomStyling.editImageView, {marginTop: -8}]}
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
                        showError={(showErrMsg && Validations.NameValidation(formData?.name))}
                        errorText={Validations.EmptyFieldStr("name")}
                    />
                    
                    <FloatTextField 
                        placeholder="Enter Email"
                        pickerLabel="Email"
                        onTextChange={(val) => onTextChange("email", val)}
                        leftImagePath={ImagesPath.emailImg}
                        showError={(showErrMsg && Validations.EmailValidation(formData?.email))}
                        errorText={Validations.EmailValidation(formData?.email)}
                    />
                  
                    <FloatTextField 
                        placeholder="Enter Mobile"
                        pickerLabel="Mobile"
                        onTextChange={(val) => onTextChange("mobile", val)}
                        leftImagePath={ImagesPath.phoneImg}
                        showError={(showErrMsg && Validations.MobileValidation(formData?.mobile))}
                        errorText={Validations.MobileValidation(formData?.mobile)}
                    />

                    <FloatTextField 
                        placeholder="Enter Password"
                        pickerLabel="Password"
                        onTextChange={(val) => onTextChange("password", val)}
                        leftImagePath={ImagesPath.lockImg}
                        isPasswordField={true}
                        showError={(showErrMsg && Validations.PasswordValidation(formData?.password))}
                        errorText={Validations.PasswordValidation(formData?.password)}
                    />
                    <DropDownPicker
                        nestedScroll={false}
                        pickerdrop={{height: 140}}
                        pickerPlaceholder={"Select Role"}
                        pickerData={rolesData}
                        pickerLabel="Role"
                        value={empRole}
                        passID={(val) => {
                          setEmpRoleId(val);
                        }}
                        onSelectValue={(text) => setEmpRole(text)}
                        showError={(showErrMsg && Validations.EmptyFieldStr(empRole))}
                        errorText={Validations.UnselectFieldStr("role")}
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
          </ScrollView>     
        </KeyboardAwareView>
      </OverlayContainer>
    );
};

export default AddEmployee;