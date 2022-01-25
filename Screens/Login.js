import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput,  Button, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Validations from "../Common/Validations";
import UserData, { userData } from "../Common/UserData";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginView = ({navigation = useNavigation()}) => {
    const [emailId, setEmail] = useState("");
    const [password, setPswrd] = useState("");
    const [message, setMsg] = useState("");
    const [data, setData] = useState({});
    let formData = new FormData()
    
    
    const LoginApi = async() => {
      formData.append('email', emailId);
      formData.append('password', password);
      const request = new Request(Global.projct.ios.BASE_URL+'login', {method: 'POST', headers: {
        Accept: 'application/json',
        }, body: formData});
        try{
            const response = await fetch(request)
            const json = await response.json();
            setMsg(json.message);
            setData(json.data);
            const object = JSON.stringify(json.data);
           // setEmail(json)
            await AsyncStorage.setItem('userData',object);
            navigation.navigate('User');
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    };
    const onsubmit = () => {
      if (Validations.EmailValidation(emailId)){
        console.error(Validations.EmailValidation(emailId));
      }
      else if (Validations.PasswordValidation(password)){
        console.error(Validations.PasswordValidation(password));
      }
      else{
        LoginApi();
      }
    }
    return(
        <View style={{padding: 16, justifyContent: "center"}}>
            <Text style={{alignSelf:"center", fontWeight:"bold", fontSize: 40, marginTop: 48}}>Login</Text>
            <View style={styles.shadowBottonContainerStyle}> 
                <Text style={{paddingTop: 0, paddingBottom: 32, alignSelf: "center", fontSize: 32, fontWeight: "bold"}}>Opayn HRMS</Text>
                <TextInput
                    style={styles.TextfieldContainer}
                    placeholder="Enter Email"
                    onChangeText={Id => setEmail(Id)}
                    defaultValue={emailId}
                />
                <TextInput
                    style={styles.TextfieldContainer}
                    placeholder="Enters Password"
                    onChangeText={pswrd => setPswrd(pswrd)}
                    defaultValue={password}
                    secureTextEntry="true"
                />
                
                <TouchableOpacity onPress={() => {onsubmit()}}>
                  <View style={{backgroundColor:Global.projct.appColors.red, borderRadius: 16, height: 50, justifyContent: "center", alignItems: "center", marginVertical: 12}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: '#fff'}}>Login</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {
                  //navigation.navigate('Home', { name: Id , pswrd: pswrd})
            
                }}>
                <Text style={{fontSize: 16, fontWeight: "bold", color: Global.projct.appColors.red, alignSelf: "flex-end", marginVertical: 16}}>Forgot Password?</Text>

                </TouchableOpacity >
              
                
            </View>
            <View style={{padding:0, flexDirection:"row", alignItems:"center", alignSelf:"center"}}>
              <Text style={{color:Global.projct.appColors.darkGray, fontSize: 16}}>Request for Approval </Text>
              <TouchableOpacity onPress = {() => {
                  navigation.navigate('ContactAdmin')
            
                }}>
                <Text style={{fontSize: 16, fontWeight: "bold", color: Global.projct.appColors.red}}>Request</Text>

                </TouchableOpacity >
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    TextfieldContainer: {
        height: 50, 
        borderWidth:1, 
        borderColor:Global.projct.appColors.lightGray, 
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
     
      shadowColor: Colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 3,
    },
    shadowBottonContainerStyle: {    //<--- Style without elevation
      borderWidth: 1,
      borderRadius: 16,
      borderColor: Global.projct.appColors.lightGray,
      borderBottomWidth: 1,
      //shadowColor: Colors.red,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 0,
      paddingVertical: 24, paddingHorizontal: 16, margin: 16
    },
    
  });

export default LoginView;