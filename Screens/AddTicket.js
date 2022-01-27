import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput,  Button, StyleSheet, TouchableOpacity } from "react-native";
import  Colors  from "../Common/Colors";
import Validations from "../Common/Validations";
import UserData, { userData } from "../Common/UserData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";

const AddTicketView = ({navigation = useNavigation()}) => {
    const [currentPassword, setCurrentPswrd] = useState("");
    const [newPassword, setNewPswrd] = useState("");
    const [confirmPassword, setConfirmPswrd] = useState('');
    const [message, setMsg] = useState("");
    const [data, setData] = useState({});
    const toast = useToast();
    let formData = new FormData()
    const [userdata, setUserData] = useState({});
     const [isLoad, setLoad] = useState(true);
     const [token, setToken] = useState('');
    var detail =  "";
    const [deail, setDetail] = useState("");
    
    const ChangePasswordApi = async() => {
      formData.append('old_password', currentPassword);
      formData.append('new_password', newPassword);
      const request = new Request(Global.projct.ios.BASE_URL+Global.projct.apiSuffix.changePassword, {method: 'POST', headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+token,
        }, body: formData});
        try{
            const response = await fetch(request)
            const json = await response.json();
            setMsg(json.message);
            if (json.hasOwnProperty("data")){
            setData(json.data);
            const object = JSON.stringify(json.data);
           // setEmail(json)
            await AsyncStorage.setItem('userData',object);
            toast.show(json.message, {duration:4000})
            navigation.goBack();
            }
            else{
              toast.show(json.message, {duration:4000});
            }
            
        } catch (error) {
        console.error(error);
        toast.show(error, {duration: 3000})
        } finally {
        setLoading(false);
        }
    };
    const onsubmit = () => {
      if (Validations.PasswordValidation(currentPassword)){
        toast.show(Validations.PasswordValidation(currentPassword), {duration: 3000});
      }
      else if (Validations.PasswordValidation(newPassword)){
        toast.show(Validations.PasswordValidation(newPassword), {duration: 3000});
      }
      else if (confirmPassword != newPassword){
          toast.show("Please enter confirm password same as new password", {duration: 3000});
      }
      else{
        ChangePasswordApi();
      }
    }
    
    const retrieveData = async() => {
        try{
            detail =  await AsyncStorage.getItem('userData');
            console.log(detail);
            setDetail(detail)
            let data = JSON.parse(detail);
            setUserData(data);
            setToken(data.token)
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
    return(
      <OverlayContainer>
            <AppBackgorund />
        <View style={{padding: 16, marginTop: 40, justifyContent: "center"}}>
            <View style={AuthStyle.CardmainContainer}> 
                <Text style={{paddingTop: 0, paddingBottom: 32, alignSelf: "center", fontSize: 32, fontWeight: "bold"}}>Add Ticket</Text>
                <TextInput
                    style={AuthStyle.inputText}
                    placeholder="Title"
                    onChangeText={pswrd => setCurrentPswrd(pswrd)}
                    defaultValue={currentPassword}
                    secureTextEntry="true"
                />
                <TextInput
                    style={{borderWidth:1, 
                        borderColor:Colors.color.lightGray, 
                        borderRadius: 8, 
                        padding: 8,
                        marginBottom: 16,
                        fontSize: 16, minHeight: 220, maxHeight: 250}}
                      multiline={true}
                      numberOfLines={4}
                    placeholder="Enter the message"
                    onChangeText={pswrd => setNewPswrd(pswrd)}
                    defaultValue={newPassword}
                />
                
                
                <TouchableOpacity onPress={() => {onsubmit()}}>
                  <View style={{backgroundColor:Colors.color.red, borderRadius: 16, height: 50, justifyContent: "center", alignItems: "center", marginVertical: 12}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: '#fff'}}>Change Password</Text>
                  </View>
                </TouchableOpacity>
                
            </View>
        </View>
        </OverlayContainer>
    );
};

export default AddTicketView;