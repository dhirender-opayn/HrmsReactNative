import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Colors, { color } from "../Common/Colors";
import { OverlayContainer } from "../Common/OverlayContainer";
import apiEndPoints from "../utils/apiEndPoints";
import { LoaderContext, UserContext } from "../utils/context";
import { apiCall } from "../utils/httpClient";
import AppBackgorund from "./BackgroundView";
import moment from 'moment';
import { AuthStyle } from "../CustomStyle/AuthStyle";
import RNFetchBlob from 'rn-fetch-blob';
import Global from "../Common/Global";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import fonts from "../Common/fonts";

const LeaveDetail = ({navigation=useNavigation(), route, updatedData = () => {}}) => {
    const [userData] = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [item, setLeaveData] = useState({});
    var fileUrl = ""
    const leaveTypes = [{value: "Single Day", id: 1}, {value: "Multiple Day", id: 2}, {value: "Short Leave", id: 4},
         {value: "First Half", id: 5}, {value: "Second Half", id: 6}, {value: "", id: 0}, {value: "", id: 3}];
    const leaveStatus = [{value: "Pending", id: 0}, {value: "Approved", id: 1}, {value: "Rejected", id: 2}];
    const { showLoader, hideLoader } = useContext(LoaderContext);

    const leaveDate = (data) => {
        var dateStr = ""
        if(data.leave_type == 2){
            dateStr = moment.utc(data.start_date).format("DD MMM, YYYY");
            dateStr += " - ";
            dateStr += moment.utc(data.end_date).format("DD MMM, YYYY");
        }
        else if (data.leave_type == 4){
            dateStr = moment.utc(data.start_date).format("DD MMM, YYYY");
            dateStr += " (";
            dateStr += moment.utc(data.start_date).local().format("HH:mm");
            dateStr += " - ";
            dateStr += moment.utc(data.end_date).local().format("HH:mm") + ")";
        }
        else{
            dateStr = moment.utc(data.start_date).format("DD MMM, YYYY");
        }
        return dateStr;
    };

    const updateLeaveStatus = async(id, userid, status) => {
        try {
          const {data} = await apiCall("POST", apiEndPoints.UpdateLeaveStatus, {user_id: userid, id: id, status: status});
          if (data.hasOwnProperty("data")){
                var leave = {...item};
                leave["status"] = status;
                setLeaveData(leave);
                route.params.updatedData(leave);
                //navigation.goBack();
          }else{
              Toast.show({type: "error", text1: data.message});
          }
        } 
        catch (error) {
            Toast.show({type: "error", text1: error});
        } finally {
            hideLoader();
        }
    };

    useEffect(() => {
        setLeaveData(route.params.data);
        setLoading(false);
    }, []);
    
  

    const checkPermission = async () => {
        //setFileUrl(Global.projct.filesURL);
        fileUrl = Global.projct.filesURL+item.file;
        if (Platform.OS === 'ios') {
          downloadFile();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'Application needs access to your storage to download File',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Start downloading
              console.log("Download");
              downloadFile();
            } else {
              // If permission denied then show alert
              console.log("Alert");
              Alert.alert('Error','Storage Permission Not Granted');
            }
          } catch (err) {
            console.log("Err: "+err);
            // To handle permission related exception
          }
        }
      };

      const downloadFile = async() => {
   
        var date = new Date();
        let extData = getFileExtention(fileUrl);
        let file_ext = '.' + extData[0];
        const { dirs: {DownloadDir, DocumentDir} } = RNFetchBlob.fs; 
        const {config} = RNFetchBlob; 
        const isIOS = Platform.OS == "ios"; 
        const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
        const fPath = aPath + '/' + new Date().getUTCMilliseconds() + file_ext;
        const configOptions = Platform.select({
          ios: {
            fileCache: true,
            path: fPath,
           // mime: 'application/xlsx',
           // appendExt: 'xlsx',
           //path: filePath,
           //appendExt: fileExt,
           notification: true,
          },
        
          android: {
            fileCache: false,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path: fPath,
              description: 'Downloading xlsx...',
            }
          },
        });
     
     
     
    if (isIOS) {
     
      config(configOptions)
        .fetch('GET', fileUrl)
        .then(res => {                 
        
          setTimeout(() => {
         
            RNFetchBlob.ios.openDocument(res.path());
           // Alert.alert(CONSTANTS.APP_NAME,'File download successfully');
          }, 300);
         
        })
        .catch(errorMessage => {
          //this.setState({overLoader: false});
          Toast.show({type: "error", text1: data.errorMessage});
        });
    } else {
      console.log("Start Download");
      config(configOptions)
        .fetch('GET', fileUrl)
        .then(res => {
          console.log("Succes: "+res);
          RNFetchBlob.android.actionViewIntent(res.path());
          //this.setState({overLoader: false});
          Toast.show({type: "success", text1: "File downloaded successfully"});
        })
        .catch((errorMessage, statusCode) => {
          console.log(errorMessage);
          //this.setState({overLoader: false});
          Toast.show({type: "error", text1: errorMessage});
        });
    }
     
    };

      const getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ?
                 /[^.]+$/.exec(fileUrl) : undefined;
      };

    return(
        <OverlayContainer>
            <AppBackgorund />
            {/* <View>
                <Text>Hello</Text>
            </View> */}
            {isLoading ? <ActivityIndicator /> :
                <View style={[CustomStyling.cardStyle, {padding: 16}]}>
                <View style={{flexDirection: 'row', width: '100%'}}>
                    <View style={{width: '60%', flexDirection: "row", marginTop: 12}}>
                        <Image source={require("../images/ticket.png")}
                                style={CustomStyling.Image18Size} 
                        />
                        <Text style={[CustomStyling.LeaveTextStyle, {marginRight: 6, width: '85%'}]} numberOfLines={1}>{item.reason}</Text>
                    </View>
                    <View style={{width: '40%', alignContent: "flex-end", borderWidth: 0}}>
                      <View style={[CustomStyling.statusStyle, {paddingHorizontal: 8, borderRadius: 24, 
                        backgroundColor: (item.status == 0) ? color.yellow : (item.status == 1) ?  color.green : color.darkRed}]}>
                          <Image source={require("../images/clock.png")}
                              style={{height: 24, width: 24, tintColor: Colors.color.white, resizeMode: "contain"}} 
                          />
                          <Text style={{fontSize: 18, fontFamily: fonts.bold, color: color.white, marginLeft: 4}}>{leaveStatus.find(status => status.id == item.status).value}</Text>
                      </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 16}}>
                        <Image source={require("../images/leaveType.png")}
                            style={CustomStyling.Image18Size} 
                        />
                        <Text style={CustomStyling.LeaveTextStyle}>{leaveTypes.find(type => type.id == item.leave_type).value}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16}}>
                        <Image source={require("../images/calendarPink.png")}
                            style={CustomStyling.Image18Size} 
                        />
                        <Text style={CustomStyling.LeaveTextStyle}>{leaveDate(item)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 16}}>
                        <Image source={require("../images/personActive.png")}
                            style={CustomStyling.Image18Size} 
                        />
                        <Text style={CustomStyling.LeaveTextStyle}>Manager: Pankaj Singh</Text>
                    </View>
                    <View style={[CustomStyling.seperatorStyle, {marginTop: 12, marginHorizontal: -4}]}></View>
                    <Text style={[CustomStyling.LeaveTextStyle, {marginTop: 16}]}>{item.reason}</Text>
                </View>
                {(item.file != null) ?
                    <TouchableOpacity onPress={() => checkPermission()}>
                    <View style={[AuthStyle.downloadView, { padding: 8, justifyContent: "center"}]}>
                        <View style={{width: '10%', justifyContent: "center"}}>
                          <Image source= {require("../images/attachment.png")}
                            style={{height: 18, width: 18 }} 
                          />
                        </View>
                        <View style={{width: '80%', justifyContent: "center"}}>
                        <Text style={{fontSize: 16, fontFamily: fonts.medium, color: color.subtitleBlack}}>Attachment</Text>
                        </View>
                        <View style={{width: '10%', justifyContent: "center"}}>
                          <Image source= {require("../images/download.png")}
                            style={{height: 28, width: 28, }} 
                          /> 
                        </View>
                    </View>
                    </TouchableOpacity> : null
                }
                {(userData.user.id == 1 && item.status == 0) ? 
                    <View style = {{ flexDirection: "row", marginTop: 8}}>
                        <TouchableOpacity style={{ padding: 8, width: '50%'}} onPress={() => {
                          showLoader();
                          updateLeaveStatus(item.id, item.user_id, 2);
                        }}>
                            <View style={{borderWidth: 1, borderColor: color.darkGray, borderRadius: 4, justifyContent: "center", height: 32}}>
                                <Text style={{textAlign: "center", fontSize: 16, fontFamily: fonts.bold, color: color.darkGray}}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 8, width: '50%'}} onPress={() => {
                          showLoader();
                          updateLeaveStatus(item.id, item.user_id, 1);
                        }}>
                            <View style={{borderRadius: 4, backgroundColor: color.green, justifyContent: "center", height: 32}}>
                                <Text style={{textAlign: "center", fontSize: 16, fontFamily: fonts.bold, color: color.white}}>Approve</Text>
                            </View>
                        </TouchableOpacity>
                    </View> : null
                }
            </View>
            }
        </OverlayContainer>
    );
};

export default LeaveDetail;