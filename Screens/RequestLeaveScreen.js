import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Colors from "../Common/Colors";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";
import ContactAdminView from "./ContactAdmin";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
 

export const RequestLeaveScreen = ({ navigation = useNavigation() }) => {
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [emailId, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMsg] = useState("");
    const [data, setData] = useState({});
    const toast = useToast();

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


   console.log( "date getting now day =====> ",date.getDate.toString)  
  


    let formData = new FormData()


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



    console.log(moment(date).format('MM/DD/YYYY HH:mm:ss'))

    const ContactAdminAPI = async () => {
        formData.append('user_id', '');
        formData.append('name', name)
        formData.append('email', emailId);
        formData.append('mobile', mobile);
        formData.append('subject', subject);
        formData.append('description', description);
        const request = new Request(Global.projct.ios.BASE_URL + Global.projct.apiSuffix.addTicket, {
            method: 'POST', headers: {
                Accept: 'application/json',
            }, body: formData
        });
        try {
            const response = await fetch(request)
            const json = await response.json();
            setMsg(json.message);
            //setData(json.data);

            toast.show(json.message, { duration: 4000 });
            setName("");
            setEmail("");
            setMobile("");
            setSubject("");
            setDescription("");
            //  navigation.goBack();
        } catch (error) {
            console.error(error);
            toast.show(error, { duration: 3000 })
        } finally {
            setLoading(false);
        }
    };
    const onsubmit = () => {
        if (Validations.NameValidation(name)) {
            toast.show(Validations.NameValidation(name), { duration: 3000 });
        }
        else if (Validations.EmailValidation(emailId)) {
            toast.show(Validations.EmailValidation(emailId), { duration: 3000 });
        }
        else if (Validations.MobileValidation(mobile)) {
            toast.show(Validations.MobileValidation(mobile), { duration: 3000 });
        }
        else if (Validations.SubjectValidation(subject)) {
            toast.show(Validations.SubjectValidation(subject), { duration: 3000 });
        }
        else if (Validations.DescriptonValidation(description)) {
            toast.show(Validations.DescriptonValidation(description), { duration: 3000 });
        }
        else {
            setLoading(true);
            ContactAdminAPI();
        }
    }
    return (
        <OverlayContainer>
            <AppBackgorund />
            <ScrollView>
                <View style={{ padding: 16, marginTop: 20, justifyContent: "center" }}>

                    <View style={AuthStyle.CardmainContainer}>
                        <TextInput
                            style={styles.TextfieldContainer}
                            placeholder="Title"
                            onChangeText={Id => setName(Id)}
                            defaultValue={name}
                        />





                        <TextInput
                            style={styles.TextfieldContainer}
                            placeholder="Leave Type"
                            onChangeText={pswrd => setEmail(pswrd)}
                            defaultValue={emailId}
                        />



                        <TouchableOpacity onPress={showDatepicker}    >
                            {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}

                                <Text style={[styles.TextfieldContainer, { paddingTop:13}]}>{moment(date).format('MM/DD/YYYY')}</Text>
                                {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            

                        </TouchableOpacity>
                        

                        <TextInput
                            style={styles.TextfieldContainer}
                            keyboardType='phone-pad'
                            placeholder="Selcte Date"
                            onChangeText={mobile => setMobile(mobile)}
                            defaultValue={mobile}
                        />

                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: Colors.color.lightGray,
                                borderRadius: 8,
                                padding: 8,
                                marginBottom: 16,
                                fontSize: 16, minHeight: 50, maxHeight: 160
                            }}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Reason"
                            onChangeText={decription => setDescription(decription)}
                            defaultValue={description}
                        />



                        <TouchableOpacity onPress={() => {
                            onsubmit()
                            //navigation.navigate('User');
                        }}>
                            <View style={{ backgroundColor: Colors.color.red, borderRadius: 16, height: 45, justifyContent: "center", alignItems: "center", marginVertical: 12 }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: '#fff' }}>Make Request</Text>
                                {isLoading ? <ActivityIndicator /> : null}
                            </View>
                        </TouchableOpacity>


                    </View>

                </View>
            </ScrollView>
        </OverlayContainer>
    );
};

const styles = StyleSheet.create({
    
    TextfieldContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.color.lightGray,
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