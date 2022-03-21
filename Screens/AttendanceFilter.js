import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, FlatList, View, Modal, TouchableOpacity, Image} from 'react-native';
import DatePicker from "react-native-date-picker";
import moment from 'moment';
import Colors, {color} from '../Common/Colors';
import { projct } from '../Common/Global';
import { MainButton } from '../components/mainButton';
import { CustomStyling } from '../CustomStyle/CustomStyling';
import ClickabletextField from '../helper/ClickableTextField';
import ImagesPath from '../images/ImagesPath';
import Validations from '../Common/Validations';

const AttendanceFilterModal = ({onPressSubmit = () => {}}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const filterData = [{id: 1, name: "Weekly"}, {id: 2, name: "Monthly"}, {id: 3, name: "Custom"}]
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [forDateType, setForDateType] = useState('');
    const [mode, setMode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showErrMsg, setShowErrMsg] = useState(false);

    const onDateSelected = (selectedDate) => {
        setDate(selectedDate)
        if (forDateType == projct.leaveDateTypes.StartDate){
            setStartDate(moment(selectedDate).format("YYYY-MM-DD"));
        }
        else if (forDateType == projct.leaveDateTypes.EndDate){
            setEndDate(moment(selectedDate).format("YYYY-MM-DD"));
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
    
    const onClickSubmit = () => {
        if (selectedFilter == 3){
            if (startDate == "" || endDate == ""){
                setShowErrMsg(true);
            }
            else{
                setShowErrMsg(false);
                let from = new Date(startDate);
                let to  = new Date(endDate);
                let fromDate = moment(from).format("yyyy-MM-DD HH:mm:ss");
                let toDate = moment(to).format("yyyy-MM-DD HH:mm:ss");
                onPressSubmit(filterData[2].name, fromDate, toDate);
            }
        }
        else if (selectedFilter == 2 || selectedFilter == 1){
            onPressSubmit(filterData.find(item => item.id == selectedFilter).name, "", "");
        }
        else{
            onPressSubmit("", "", "");
        }
    };

    useEffect(() => {
        setShowErrMsg(false);
    }, []);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
                
        }}>
            <View style={styles.overlaycontainer}>
                <View style={styles.sectionview}>
                    <Text style={CustomStyling.containerTitle}>Filter</Text>
                    <FlatList 
                        data={filterData}
                        keyExtractor={({id}, index) => id}
                        renderItem={({item}) => (
                    
                        <View style={{ flexDirection: "row", borderBottomWidth: (item.id == filterData.length) ? 0 : 1, borderBottomColor: Colors.color.lightGray, paddingTop: 16, paddingBottom: 16, justifyContent: "center"}}>
                                <TouchableOpacity onPress={() => 
                                    setSelectedFilter(item.id)
                                }>
                                <Image source={(item.id == selectedFilter) ? ImagesPath.radioBtnOnImg :ImagesPath.radioBtnOffImg}
                                    style={{height: 20, width: 16, flex: 1, tintColor: Colors.color.imageBlack, resizeMode: "contain"}} 
                                />
                            </TouchableOpacity>
                            <Text style={[styles.subtext, {flex: 7, height: 20}]}>{item.name}</Text>
                        </View>
                    
                        )}
                        style={{marginTop: 12}}
                    />
                    {(selectedFilter == 3) ? 
                        <View style={{flexDirection: "row", marginTop: 12, marginHorizontal: -8}}>
                        
                            <ClickabletextField 
                                containerStyle={{flex: 1, marginEnd: 4}}
                                imageStyle={{marginEnd: 8}}
                                defaultValue='Start Date'
                                value={startDate}
                                onTouch={() => {showDatepicker(projct.leaveDateTypes.StartDate)}}
                                pickerLabel='Start Date'
                                rightImagePath={ImagesPath.plainCalendarImg}
                                showError={(showErrMsg && startDate == "")}
                                errorText={Validations.UnselectFieldStr("start date")}
                            />
                        
                            <ClickabletextField 
                                containerStyle={{flex: 1, marginLeft: 4}}
                                imageStyle={{marginEnd: 8}}
                                defaultValue='End Date'
                                value={endDate}
                                onTouch={() => {showDatepicker(projct.leaveDateTypes.EndDate)}}
                                pickerLabel='End Date'
                                rightImagePath={ImagesPath.plainCalendarImg}
                                showError={(showErrMsg && endDate == "")}
                                errorText={Validations.UnselectFieldStr("end date")}
                            />
                        </View>
                        : null
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
                    <MainButton 
                        text={'Submit'}
                        onPress={() =>{
                            onClickSubmit();
                        }}
                        viewStyle={{marginTop: 12}}
                    />     
                </View>
                
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  overlaycontainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sectionview: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 24,
    alignSelf: 'center',
    
    borderRadius: 8,
    width: '80%',
  },
  mainText: {
    color: color.darkGray,
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 8
  },
  subtext: {
    color: color.subtitleBlack,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 8
  },
  cancelmodal: {
    color: color.red,
    fontSize: 16,
    marginTop: 24,
  },
  lineview: {
    height:1,
    width: '80%',
    marginTop: 32,
    backgroundColor: '#808B96',
  },
});
export default AttendanceFilterModal;
