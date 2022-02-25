import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput,  Button, StyleSheet, TouchableOpacity } from "react-native";
import  Colors  from "../Common/Colors";
import Validations from "../Common/Validations";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";

const AddTicketView = ({navigation = useNavigation()}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMsg] = useState("");
    const [data, setData] = useState({});
    const toast = useToast();
    let formData = new FormData()
    const [userdata, setUserData] = useState({});
     const [isLoad, setLoad] = useState(true);
     const [token, setToken] = useState('');
    var detail =  "";
    const [deail, setDetail] = useState("");
    
    const ContactAdminAPI = async() => {
      formData.append('user_id', userdata.user.id);
      formData.append('name', userdata.user.name)
      formData.append('email', userdata.user.email);
      formData.append('mobile', userdata.user.mobile);
      formData.append('subject', title);
      formData.append('description', description);
      const request = new Request(Global.projct.ios.BASE_URL+Global.projct.apiSuffix.addTicket, {method: 'POST', headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+token,
        }, body: formData});
        try{
            const response = await fetch(request)
            const json = await response.json();
            setMsg(json.message);
             //setData(json.data);

            toast.show(json.message, {duration: 4000});
             
            navigation.goBack();
        } catch (error) {
        console.error(error);
        toast.show(error, {duration: 3000})
        } finally {
        setLoading(false);
        }
    };
    const onsubmit = () => {
      if (Validations.FieldValidation(title)){
        toast.show(Validations.EmptyFieldStr("title"), {duration: 3000});
      }
      else if (Validations.FieldValidation(description)){
        toast.show(Validations.EmptyFieldStr("description"), {duration: 3000});
      }
      else{
        ContactAdminAPI();
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
                    onChangeText={title => setTitle(title)}
                    defaultValue={title}
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
                    onChangeText={msg => setDescription(msg)}
                    defaultValue={description}
                />
                
                
                <TouchableOpacity onPress={() => {onsubmit()}}>
                  <View style={{backgroundColor:Colors.color.red, borderRadius: 16, height: 50, justifyContent: "center", alignItems: "center", marginVertical: 12}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: '#fff'}}>Add Ticket</Text>
                  </View>
                </TouchableOpacity>
                
            </View>
        </View>
        </OverlayContainer>
    );
};

export default AddTicketView;