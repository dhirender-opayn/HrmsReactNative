import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput,  Button, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import  Colors  from "../Common/Colors";
import Validations from "../Common/Validations";
import UserData, { userData } from "../Common/UserData";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";

const ContactAdminView = ({navigation = useNavigation()}) => {
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [emailId, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMsg] = useState("");
    const [data, setData] = useState({});
    const toast = useToast();

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
             setName("");
             setEmail("");
             setMobile("");
             setSubject("");
             setDescription("");
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
    }
    return(
      <OverlayContainer>
            <AppBackgorund />
      <ScrollView>
        <View style={{padding: 16, marginTop: 80, justifyContent: "center"}}>
            <Text style={AuthStyle.textTitile}>Contact Admin</Text>
            <View style={AuthStyle.CardmainContainer}> 
                <TextInput
                    style={styles.TextfieldContainer}
                    placeholder="Name"
                    onChangeText={Id => setName(Id)}
                    defaultValue={name}
                />
                <TextInput
                    style={styles.TextfieldContainer}
                    placeholder="Email"
                    onChangeText={pswrd => setEmail(pswrd)}
                    defaultValue={emailId}
                />
                <TextInput
                    style={styles.TextfieldContainer}
                    keyboardType='phone-pad'
                    placeholder="Mobile"
                    onChangeText={mobile => setMobile(mobile)}
                    defaultValue={mobile}
                />
                <TextInput
                    style={styles.TextfieldContainer}
                    placeholder="Subject"
                    onChangeText={subject => setSubject(subject)}
                    defaultValue={subject}
                />
                <TextInput
                    style={{borderWidth:1, 
                      borderColor:Colors.color.lightGray, 
                      borderRadius: 8, 
                      padding: 8,
                      marginBottom: 16,
                      fontSize: 16, minHeight: 50, maxHeight: 160}}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Description"
                    onChangeText={decription => setDescription(decription)}
                    defaultValue={description}
                />
                
                <TouchableOpacity onPress={() => {
                  onsubmit()
                //navigation.navigate('User');
                }}>
                  <View style={{backgroundColor:Colors.color.red, borderRadius: 16, height: 50, justifyContent: "center", alignItems: "center", marginVertical: 12}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: '#fff'}}>Make Request</Text>
                    {isLoading ? <ActivityIndicator /> : null}
                  </View>
                </TouchableOpacity>
                <View style={{padding:0, flexDirection:"row", alignItems:"center", alignSelf:"center"}}>
                  <Text style={{color:Colors.color.darkGray, fontSize: 16}}>Already Approved </Text>
                  <TouchableOpacity onPress = {() => {
                     // navigation.navigate('Home', { name: Id , pswrd: pswrd})
                      navigation.goBack()
                  }}>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: Colors.color.red}}>Login</Text>

                  </TouchableOpacity >
            </View>
                
            </View>
            
        </View>
        </ScrollView>
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