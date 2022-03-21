import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";
import Global, { projct } from "../Common/Global";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Colors, { color } from "../Common/Colors";
import Validations from "../Common/Validations";
import { OverlayContainer } from "../Common/OverlayContainer";
import AppBackgorund from "./BackgroundView";
import { AuthStyle } from "../CustomStyle/AuthStyle";
import Toast from "react-native-toast-message";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "../helper/DropDownPicker"
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import apiEndPoints from "../utils/apiEndPoints";
import { LoaderContext, UserContext } from "../utils/context";
import FloatTextField from "../helper/FloatTextField";
import ClickabletextField from "../helper/ClickableTextField";
import ImagePicker from "react-native-image-crop-picker";
import ImagesPath from "../images/ImagesPath";
import { MainButton } from "../components/mainButton";
import fonts from "../Common/fonts";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { strings } from "../Common/String";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import PopUpModal from "../helper/PopUpModal";

export const AddHoliday = ({ navigation = useNavigation() }) => {
    const [userData, setUserData] = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [leaveTypeId, setLeaveTypeId] = useState("1");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState("");
    const [forDateType, setForDateType] = useState("");
    const {showLoader, hideLoader} = useContext(LoaderContext);
    const [selectdImageData, setSelectedImgData] = useState({});
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showPickerModal, setShowPicker] = useState(false);
    const [showErrMsg, setShowErrMsg] = useState(false);

    const leaveTypes = [
        {name: "Short Leave", id: 4},
        {name: "Half Day", id: 3}, 
        {name: "Single Day", id: 1}, 
        {name: "Multiple Day", id: 2}
    ];
    const [DocsData, setDocData] = useState({});
    var fromDate = "";
    var toDate = ""
    var formData = new FormData();

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
            setEndTime(moment(selectedDate).format("HH:mm"));
        }
        setShow(false);
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
            setLeaveTypeId("5");
        }
        else{
            setLeaveTypeId("6");
        }
    }

      
    const AddHolidayAPI = async() => {
        // var param = {};
        // formData.append('user_id',  String(userData.user.id) );
        // formData.append('start_date', fromDate );
        // formData.append('end_date', toDate );
        // formData.append('reason', description );
        // formData.append('type',leaveTypeId);
        //  if (fileName != ""){
        //     // formData.append('file', {
        //     //    uri: Platform.OS === 'android' ? `${fileData}` : fileData.replace('file://',''),
        //     //    type: fileMimetype,
        //     //    name: fileName,
        //     //  } );
        //     formData.append("file", DocsData);
        //  }
        //  console.log(formData);
        //  const request = new Request(Global.projct.ios.BASE_URL+apiEndPoints.AddLeaveRequest, {method: 'POST', headers: {
        //    Accept: 'application/json',
        //    Authorization: `Bearer ${userData.token}`
        //    }, body: formData});
        //    try{
        //        const response = await fetch(request)
        //        const json = await response.json();
        //        console.log(json);
               
        //        if (json.message.toLowerCase().includes('success')){
        //            navigation.goBack();
        //            Toast.show({type: "success", text1: json.message});
        //        }
        //        else{
        //         Toast.show({type: "error", text1: json.message})
        //        }
        //    } catch (error) {
        //         console.log(JSON.stringify(error));
        //         Toast.show({type: "success", text1: error})
        //    } finally {
        //         hideLoader();
        //    }
       };
    const onsubmit = () => {
        if (Validations.FieldValidation(title) || Validations.FieldValidation(leaveType) || (startDate == "") || Validations.FieldValidation(description)) {
            setShowErrMsg(true);
        }
        else if (leaveTypeId == '2'){
            if (endDate == ""){
                setShowErrMsg(true);
            }
            else{
                setShowErrMsg(false);
                let from = new Date(startDate);
                let to  = new Date(endDate);
                let sDate = moment(from).format("yyyy-MM-DD HH:mm:ss");
                let eDate = moment(to).format("yyyy-MM-DD HH:mm:ss");
                fromDate = sDate;
                toDate = eDate;
                showLoader();
                AddHolidayAPI();
            }
        }
        else if (leaveTypeId == '3'){
            setShowErrMsg(true);
        }
        else if (leaveTypeId == '4'){
            if (startTime == "" || endTime == ""){
                setShowErrMsg(true);
            }
            else{
                setShowErrMsg(false);
                let from = startDate + " " + startTime;
                let to = startDate + " " + endTime;
                let sDate = moment(from).format("yyyy-MM-DD HH:mm:ss");
                let eDate = moment(to).format("yyyy-MM-DD HH:mm:ss");
                fromDate = sDate;
                toDate = eDate;
                showLoader();
                AddHolidayAPI();
            }
        }
        else {
            setShowErrMsg(false);
            let sDate = moment(new Date(startDate)).format("yyyy-MM-DD HH:mm:ss");
            fromDate = sDate;
            toDate = sDate;
            showLoader();
            AddHolidayAPI();
        }
    };

    const openImagePicker = () => {
        ImagePicker.openPicker({         
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
    useEffect
    return (
        <OverlayContainer>
            <AppBackgorund />
            <KeyboardAwareView doNotForceDismissKeyboardWhenLayoutChanges={true} animated={true}>
            <ScrollView>
                <View style={{ padding: 16, marginTop: 20, justifyContent: "center" }}>

                    <View style={AuthStyle.CardmainContainer}>
                    { (selectdImageData.path != null || selectdImageData.path != undefined) ?
                    (<Image 
                    source={{
                        uri: selectdImageData.path,
                        //method: 'GET'
                    }}
                    style={[CustomStyling.editImageView, {marginTop: 16}]}
                    />) :
                    
                        (<Image 
                            source={ImagesPath.meetingImg}
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
                            placeholder="Enter Title"
                            defaultValue={title}
                            pickerLabel="Title"
                            onTextChange={(val) => setTitle(val)}
                            containerStyle={{marginTop: 32}}
                            showError={(showErrMsg && Validations.FieldValidation(title))}
                            errorText={Validations.EmptyFieldStr("title")}
                        />
                        
                        <View style={{zIndex: 1000}}>
                        <DropDownPicker
                            nestedScroll={false}
                            pickerdrop={{height: 160}}
                            pickerPlaceholder={"Select Leave"}
                            pickerLabel={"Slect Leave"}
                            pickerData={leaveTypes}
                            value={leaveType}
                            passID={(val) => {
                                setLeaveTypeId(val)
                            }}
                            onSelectValue={(text) => setLeaveType(text)}
                            showError={(showErrMsg && Validations.FieldValidation(leaveType))}
                            errorText={Validations.UnselectFieldStr("leave type")}
                        />
                        </View>

                        {(leaveTypeId == "2") ? 
                            <View style={{flex: 1, flexDirection: "row"}}>
                                {/* <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.StartDate)}  style={{flex: 1}}  >
                                <Text style={[styles.TextfieldContainer, { paddingTop:13, marginEnd: 4}]}>{startDate}</Text>
                                </TouchableOpacity> */}
                                <ClickabletextField 
                                    containerStyle={{flex: 1, marginEnd: 4}}
                                    imageStyle={{marginEnd: 8}}
                                    defaultValue='Start Date'
                                    value={startDate}
                                    onTouch={() => {showDatepicker(projct.leaveDateTypes.StartDate)}}
                                    pickerLabel='Start Date'
                                    rightImagePath={ImagesPath.plainCalendarImg}
                                    showError={(showErrMsg && Validations.FieldValidation(startDate))}
                                    errorText={Validations.UnselectFieldStr("start date")}
                                />
                                {/* <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.EndDate)}  style={{flex: 1}}  >
                                    <Text style={[styles.TextfieldContainer, { paddingTop:13, marginLeft: 4}]}>{endDate}</Text>
                                </TouchableOpacity> */}
                                <ClickabletextField 
                                    containerStyle={{flex: 1, marginLeft: 4}}
                                    imageStyle={{marginEnd: 8}}
                                    defaultValue='End Date'
                                    value={endDate}
                                    onTouch={() => {showDatepicker(projct.leaveDateTypes.EndDate)}}
                                    pickerLabel='End Date'
                                    rightImagePath={ImagesPath.plainCalendarImg}
                                    showError={(showErrMsg && Validations.FieldValidation(endDate))}
                                    errorText={Validations.UnselectFieldStr("end date")}
                                />
                            </View> :
                            // <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.StartDate)}    >
                            //     {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}

                            //     <Text style={[styles.TextfieldContainer, { paddingTop:13}]}>{startDate}</Text>
                            // </TouchableOpacity>
                            <ClickabletextField 
                                defaultValue='Start Date'
                                value={startDate}
                                onTouch={() => {showDatepicker(projct.leaveDateTypes.StartDate)}}
                                pickerLabel='Start Date'
                                rightImagePath={ImagesPath.plainCalendarImg}
                                showError={(showErrMsg && Validations.FieldValidation(startDate))}
                                errorText={Validations.UnselectFieldStr("start date")}
                            />
                        }

                        {(leaveTypeId == '4') ?  
                            <View style={{flex: 1, flexDirection: "row"}}>
                                {/* <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.StartTime)}  style={{flex: 1}}  >
                                    <Text style={[styles.TextfieldContainer, { paddingTop:13, marginEnd: 4}]}>{startTime}</Text>
                                </TouchableOpacity> */}
                                <ClickabletextField 
                                    containerStyle={{flex: 1, marginEnd: 4}}
                                    imageStyle={{marginEnd: 8}}
                                    defaultValue='From'
                                    value={startTime}
                                    onTouch={() => {showDatepicker(projct.leaveDateTypes.StartTime)}}
                                    pickerLabel='From'
                                    rightImagePath={ImagesPath.clockImg}
                                    showError={(showErrMsg && Validations.FieldValidation(startTime))}
                                    errorText={Validations.UnselectFieldStr("start time")}
                                />
                                {/* <TouchableOpacity onPress={() => showDatepicker(projct.leaveDateTypes.EndTime)}  style={{flex: 1}}  >
                                    <Text style={[styles.TextfieldContainer, { paddingTop:13, marginLeft: 4}]}>{endTime}</Text>
                                </TouchableOpacity> */}
                                <ClickabletextField 
                                    containerStyle={{flex: 1, marginLeft: 4}}
                                    imageStyle={{marginEnd: 8}}
                                    defaultValue='To'
                                    value={endTime}
                                    onTouch={() => {showDatepicker(projct.leaveDateTypes.EndTime)}}
                                    pickerLabel='To'
                                    rightImagePath={ImagesPath.clockImg}
                                    showError={(showErrMsg && Validations.FieldValidation(endTime))}
                                    errorText={Validations.UnselectFieldStr("end time")}
                                />
                            </View> : null
                        }

                        {(leaveTypeId == "3" || leaveTypeId == "5" || leaveTypeId == "6") ?
                        <View style={{marginBottom: 24}}>
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
                                </View>
                                {(showErrMsg && leaveTypeId == 3) ? <Text style={CustomStyling.ErrorText}>Please select first or second half</Text> : null}
                            </View> : null
                        }    
                        {show && (
                                <DatePicker
                                    modal
                                    mode={mode}
                                    open={show}
                                    date={date}
                                    minimumDate={date}
                                    onConfirm={(selectedDate) => {
                                        onDateSelected(selectedDate);
                                    }}
                                    onCancel={() => {
                                    setShow(false);
                                    }}
                                />
                            )}
                        {showPickerModal && (
                            <PopUpModal
                            onPressCamera={openCamera}
                            onPressGallery={openImagePicker}
                            onPressCancel={() => setShowPicker(false)}
                            />
                        )}

                        <FloatTextField 
                            placeholder="Enter Reason"
                            defaultValue={description}
                            pickerLabel="Reason"
                            onTextChange={(val) => setDescription(val)}
                            textInputMultiline={true}
                            //textInputLines={4}
                            containerStyle={{height: 160}}
                            textInputStyle={{height: 150}}
                            showError={(showErrMsg && Validations.FieldValidation(description))}
                            errorText={Validations.EmptyFieldStr("reason")}
                        />

                        <MainButton
                            text={'Add Holiday'}
                            onPress={() => {onsubmit()}}
                        />

                    </View>

                </View>
            </ScrollView>
            </KeyboardAwareView>

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
        fontFamily: fonts.semiBold,
        textAlign: "center",
        color: color.white,
    },
    UnselectedText: {
        fontSize: 16,
        textAlign: "center",
        color: color.black,
        fontFamily: fonts.semiBold,
    },

});