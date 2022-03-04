import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Colors, { color } from "../Common/Colors";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStyle } from "../CustomStyle/AuthStyle";
import { useToast } from "react-native-toast-notifications";
import ContactAdminView from "./ContactAdmin";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "../helper/DropDownPicker"
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import { apiCall } from "../utils/httpClient";
import apiEndPoints from "../utils/apiEndPoints";
import { UserContext } from "../utils/context";

export const RequestLeaveScreen = ({ navigation = useNavigation() }) => {
    const [userData, setUserData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [leaveTypeId, setLeaveTypeId] = useState("1");
    const [startDate, setStartDate] = useState('Start Date sel');
    const [endDate, setEndDate] = useState('End Date');
    const [startTime, setStartTime] = useState('Start Time');
    const [endTime, setEndTime] = useState('End Time');
    const [isFirstHalf, setiSFirstHalf] = useState('');
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [fileName, setFileName] = useState("Upload File");
    const toast = useToast();
    const [forDateType, setForDateType] = useState(projct.leaveDateTypes.StartDate);
    const [fileData, setFileData] = useState();
    const fileParam = useState('file');
    const [fileMimetype, setFileMimetype] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const leaveTypes = [
        {value: "Short Leave", id: 4},
        {value: "Half Day", id: 3}, 
        {value: "Single Day", id: 1}, 
        {value: "Multiple Day", id: 2}
    ];
    const [DocsData, setDocData] = useState({});
    var fromDate = "";
    var toDate = ""
    let formData = new FormData();
   //console.log( "date getting now day =====> ",date.getDate.toString)  
   function stringToDate(_date,_format,_delimiter)
   {
               var formatLowerCase=_format.toLowerCase();
               var formatItems=formatLowerCase.split(_delimiter);
               var dateItems=_date.split(_delimiter);
               var monthIndex=formatItems.indexOf("mm");
               var dayIndex=formatItems.indexOf("dd");
               var yearIndex=formatItems.indexOf("yyyy");
               var month=parseInt(dateItems[monthIndex]);
               month-=1;
               var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
               return formatedDate;
   }

    const onDateSelected = (selectedDate) => {
        setDate(selectedDate)
        if (forDateType == projct.leaveDateTypes.StartDate){
            setStartDate(moment(selectedDate).format("YYYY-MM-DD"));
        }
        else if (forDateType == projct.leaveDateTypes.EndDate){
            setEndDate(moment(selectedDate).format("YYYY-MM-DD"));
        }
        else if (forDateType == projct.leaveDateTypes.StartTime){
            setStartTime(moment(selectedDate).format("HH:mm"));
        }
        else{
            setEndTime(moment(selectedDate).format("HH: mm"));
        }
        setShow(false);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = (dateType) => {
        setForDateType(dateType);
        if (dateType == projct.leaveDateTypes.StartDate || dateType == projct.leaveDateTypes.EndDate){
            setMode('date');
        }
        else{
            setMode('time');
        }
        setShow(true);
    };
    const setHalfDayLeave = (firstHalf) => {
        if (firstHalf){
            setiSFirstHalf(true);
            setLeaveTypeId("5");
        }
        else{
            setiSFirstHalf(false);
            setLeaveTypeId("6");
        }
    }

    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            console.log("Hello")
          const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          });
          let res = result[0];
          console.log('res : ' + JSON.stringify(res));
          console.log('URI : ' + res.uri);
          console.log('Type : ' + res.type);
          console.log('File Name : ' + res.name);
          console.log('File Size : ' + res.size);
          //Setting the state to show single file attributes\
        //   let data = new Blob([res.uri], {type: res.type});
        //   alert(data);
           setFileData(res.uri);
           setFileMimetype(res.type);
           setFileName("HRMS-"+res.name);
        let data = {uri: res.uri, name: "HRMS-"+res.name, type: res.type};
        setDocData(data);
          alert("Success "+ JSON.stringify(result));
          addEventListener;
        } catch (err) {
          //Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            //If user canceled the document selection
            alert('Canceled from single doc picker');
          }
          else if (DocumentPicker.isInProgress(err)){
              alert('In Progreess')
          }
          else if (DocumentPicker.releaseSecureAccess(uris)){
            alert("iOS secure access error.")
          }
           else {
            console.log(JSON.stringify(err));
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
      };
      
    const AddLeaveAPI = async () => {
        console.log("Lets "+fromDate+" "+toDate+" "+description+" "+leaveTypeId+" "+String(userData.user.id)+" "+DocsData);
        var params = JSON.stringify({file: fileData, start_date: fromDate, end_date: toDate, reason: description, type: leaveTypeId, user_id: String(userData.user.id)});
        console.log('Start');
        formData.append("user_id", String(userData.user.id));
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        formData.append("reason", description);
        formData.append("type", leaveTypeId);
        formData.append("file", {uri: fileData, name: fileName, type: fileMimetype});
        console.log(formData);
        
        //console.log(params);
        // try {
        //     const {data} = await apiCall("POST", apiEndPoints.AddLeaveRequest, formData)
        //     console.log(data);
        //     if (data.code == 200){
        //         toast.show(data.message, {duration: 4000});
        //         navigation.goBack();
        //     }
        //     else{
        //         toast.show(data.message, {duration: 4000});
        //     }
        // } catch (error) {
        //     console.error(error);
        //     toast.show(error, { duration: 3000 })
        // } finally {
        //     setLoading(false);
        // }
        const request = new Request(Global.projct.ios.BASE_URL+apiEndPoints.AddLeaveRequest, {method: 'POST', headers: {
            Accept: 'application/json',
            Authorization: 'Bearer '+userData.token,
            }, body: formData});
            try{
                const response = await fetch(request)
                const json = await response.json();
             
            console.log(json);
            toast.show(json.message, {duration:4000});
            } catch (error) {
            console.error(error);
            toast.show(error, {duration: 3000})
            } finally {
            setLoading(false);
            }
    };
    const onsubmit = () => {
        if (Validations.FieldValidation(title)) {
            toast.show(Validations.EmptyFieldStr("title"), { duration: 3000 });
        }
        else if (Validations.FieldValidation(leaveType)) {
            toast.show(Validations.EmptyFieldStr("leave type"), { duration: 3000 });
        }
        else if (startDate == "Start Date") {
            toast.show("Please select start date", { duration: 3000 });
        }
        else if (Validations.FieldValidation(description)) {
            toast.show(Validations.EmptyFieldStr("description"), { duration: 3000 });
        }
        else if (leaveTypeId == '2'){
            if (endDate == "End Date"){
                toast.show("Please select end date", {duration: 3000});
            }
            else{
                let from = new Date(startDate);
                let to  = new Date(endDate);
                console.log(from);
                let sDate = moment(from).format("yyyy-MM-DD HH:mm:ss");
                console.log(sDate);
                let eDate = moment(to).format("yyyy-MM-DD HH:mm:ss");
                fromDate = sDate;
                toDate = eDate;
                setLoading(true);
                AddLeaveAPI();
            }
        }
        else if (leaveTypeId == '3'){
            toast.show("Please select first or second half", {duration: 3000});
        }
        else if (leaveTypeId == '4'){
            if (startTime == "Start Time"){
                toast.show("Please select start time", {duration: 3000});
            }
            else if (endTime == "End Time"){
                toast.show("Please select end time", {duration: 3000});
            }
            else{
                let from = startDate + " " + startTime;
                let to = startDate + " " + endTime;
                let sDate = moment(new Date(from)).format("yyyy-MM-DD HH:mm:ss");
                let eDate = moment(new Date(to)).format("yyyy-MM-DD HH:mm:ss");
                fromDate = sDate;
                toDate = eDate;
                setLoading(true);
                AddLeaveAPI();
            }
        }
        else {
            console.log("SD: "+new Date(startDate));
            let sDate = moment(new Date(startDate)).format("yyyy-MM-DD HH:mm:ss");
            console.log("stat: "+sDate);
            fromDate = sDate;
            toDate = sDate;
            setLoading(true);
            AddLeaveAPI();
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
                            onChangeText={Id => setTitle(Id)}
                            defaultValue={title}
                        />
                        {/* <TextInput
                            style={styles.TextfieldContainer}
                            placeholder="Leave Type"
                           //onChangeText={pswrd => s(pswrd)}
                            defaultValue={leaveType}
                        /> */}
                        <View style={{zIndex: 1000}}>
                        <DropDownPicker
                            containerStyle={styles.TextfieldContainer}
                            //style={{marginTop: opened ? 175 : 20}}
                            nestedScroll={false}
                            pickerdrop={{height: 160}}
                            pickerPlaceholder={"Select Leave"}
                            pickerData={leaveTypes}
                            value={leaveType}
                            passID={(val) => {
                                setLeaveTypeId(val)
                            }}
                            onSelectValue={(text) => setLeaveType(text)}
                        />
                        </View>

                        {(leaveTypeId == "2") ? 
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.StartDate)}  style={{flex: 1}}  >
                                <Text style={[styles.TextfieldContainer, { paddingTop:13, marginEnd: 4}]}>{startDate}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.EndDate)}  style={{flex: 1}}  >
                                    <Text style={[styles.TextfieldContainer, { paddingTop:13, marginLeft: 4}]}>{endDate}</Text>
                                </TouchableOpacity>
                            </View> :
                            <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.StartDate)}    >
                                {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}

                                <Text style={[styles.TextfieldContainer, { paddingTop:13}]}>{startDate}</Text>
                            </TouchableOpacity>
                        }

                        {(leaveTypeId == '4') ?  
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.StartTime)}  style={{flex: 1}}  >
                                    <Text style={[styles.TextfieldContainer, { paddingTop:13, marginEnd: 4}]}>{startTime}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.EndTime)}  style={{flex: 1}}  >
                                    <Text style={[styles.TextfieldContainer, { paddingTop:13, marginLeft: 4}]}>{endTime}</Text>
                                </TouchableOpacity>
                            </View> : null
                        }

                        {(leaveTypeId == "3" || leaveTypeId == "5" || leaveTypeId == "6") ?
                            <View style={styles.HalfLeaveView}>
                                <TouchableOpacity onPress={() => setHalfDayLeave(true)}  style={[
                                    (leaveTypeId == '5') ? styles.SelectedHalfView : styles.UnselectedHalfView, 
                                    {borderTopLeftRadius: 8, borderBottomLeftRadius: 8}
                                ]}>
                                    <Text style={(leaveTypeId == '5') ? styles.selectedText : styles.UnselectedText}>First Half</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setHalfDayLeave(false)}  style={[
                                    (leaveTypeId == '6') ? styles.SelectedHalfView : styles.UnselectedHalfView,
                                    {borderTopRightRadius: 8, borderBottomRightRadius: 8}
                                ]}>
                                    <Text style={(leaveTypeId == '6') ? styles.selectedText : styles.UnselectedText}>Second Half</Text>
                                </TouchableOpacity>
                            </View> : null
                        }    
                        {show && (
                                <DatePicker
                                    modal
                                    mode={mode}
                                    open={show}
                                    date={date}
                                    onConfirm={(selectedDate) => {
                                        onDateSelected(selectedDate);
                                    }}
                                    onCancel={() => {
                                    setShow(false);
                                    }}
                                />
                            )}
                            
                        <TouchableOpacity onPress={() => selectOneFile()}    >
                                {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}

                                <Text style={[styles.TextfieldContainer, { paddingTop:13}]}>{fileName}</Text>
                            </TouchableOpacity>

                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: Colors.color.lightGray,
                                borderRadius: 8,
                                padding: 8,
                                marginBottom: 16,
                                fontSize: 16, minHeight: 80, maxHeight: 160
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
                            <View style={{ backgroundColor: Colors.color.red, borderRadius: 16, height: 56, justifyContent: "center", alignItems: "center", marginVertical: 12 }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: '#fff' }}>Submit Request</Text>
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
        marginBottom: 24,
        fontSize: 16
    },
    HalfLeaveView: {
        marginBottom: 16,
        flex: 1,
        flexDirection: "row",
    },
    SelectedHalfView: {
        backgroundColor: color.black,
        borderWidth: 1,
        borderColor: Colors.color.lightGray,
        flex: 1,
        height: 50,
        justifyContent: "center",
    },
    UnselectedHalfView: {
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: Colors.color.lightGray,
        flex: 1,
        height: 50,
        justifyContent: "center"
    },
    selectedText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: "center",
        color: color.white,
    },
    UnselectedText: {
        fontSize: 16,
        textAlign: "center",
        color: color.black,
        fontWeight: '600',
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