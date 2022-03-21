const { StyleSheet } = require("react-native");
import Colors,{color}from "../Common/Colors";
import fonts from "../Common/fonts";

export const CustomStyling = StyleSheet.create({
    cardStyle: {
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 8,
        borderRadius: 8,
        borderWidth: 0,
        borderColor: color.lightGray,
        backgroundColor: color.white,
        shadowColor: Colors.color.lightGray,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2,
    },
    statusStyle: {
        //height: 32,
        borderRadius: 16,
        backgroundColor: color.red,
        paddingHorizontal: 8,
        paddingVertical: 6,
        alignSelf: "flex-end",
        flexDirection: 'row'
    },
    seperatorStyle: {
        height: 1,
        backgroundColor: color.lightGray,
        marginHorizontal: 8,
        marginVertical: 4
    },
    imageThumb:{
        marginTop: 20,
        height:80,
        width:80,
        borderRadius: 40,
        alignSelf:'center',
    },
    containerTitle:{
        paddingBottom: 32, 
        alignSelf: "center", 
        fontSize: 23, 
        fontFamily: "Asap-SemiBold",
        color: color.titleBlack,
        textAlign: "center"
    },
    fieldTitle:{
        fontSize: 14,
        fontFamily: "Asap-Regular",
        color: color.titleBlack,
        backgroundColor: color.white,
    },
    fieldText:{
        fontSize: 16,
        fontFamily: "Asap-Regular",
        height: 40
    },
    fieldSubView:{
        width: '10%', 
        justifyContent: "center"
    },
    fieldImage: {
        height: 20, 
        width: 20, 
        tintColor: color.imageBlack
    },
    regular16Text:{
        fontFamily: "Asap-Regular",
        fontSize: 16,
        color: color.subtitleBlack,
    },
    medium16Text: {
        fontSize: 16,
        fontFamily: 'Asap-Medium',
        color: color.titleBlack,
    },
    passwordImage: {
        position: "absolute", 
        alignSelf: "center", 
        height: 16, width: 16, 
        tintColor: color.imageBlack
    },
    title:{
        fontSize:20,
        color:color.white,
        alignSelf:'center',
        fontFamily: 'Asap-Bold',
    },
    btnTitle:{
        fontSize:18,
        color:color.white,
        alignSelf:'center',
        fontWeight:'bold',
    },
    subTitle:{
        fontSize:16,
        color:color.white,
        alignSelf:'center',
        fontFamily:'Asap-SemiBold', 
    },
    listTitle:{
        fontSize:16,
        color:color.titleBlack,
        fontFamily:'Asap-SemiBold', 
        paddingHorizontal: 8,
        flex: 7, 
        height: 18
    },
    rightArrowImg:{
        height: 20, 
        width: 16, 
        flex: 1, 
        tintColor: Colors.color.imageBlack, 
        resizeMode: "contain"
    },
    textcontainer:{
        fontSize:18,
        color:color.gray,
        alignSelf:'center',
        fontWeight:'600',
    },
    detailLabel: {
        fontFamily: fonts.semiBold,
        fontSize: 14,
        color: color.subtitleBlack,
        width: '50%'
    },
    attendanceLabel: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: color.subtitleBlack,
        width: '50%'
    },
    editImageView: {
        width:100, 
        height: 100, 
        borderRadius: 50, 
        marginTop: -80, 
        borderWidth: 1, 
        borderColor: color.red, 
        alignSelf: "center"
    },
    editImageBtn: {
        width:32, 
        height: 32, 
        borderRadius: 16, 
        marginTop: -40, 
        borderWidth: 1, 
        borderColor: color.red, 
        marginStart: 80,
        alignSelf: "center",
        justifyContent: "center", 
        backgroundColor: color.white,
    },
    camerImageStyle: {
        height: 16, 
        width: 16, 
        alignSelf: "center", 
        tintColor: color.backgroundBlack
    },
    workTextStyle: {
        fontSize: 16, 
        fontFamily: fonts.semiBold,
        color: color.darkGray,
        marginHorizontal: 8,
    },
    Image18Size: {
        height: 18, 
        width: 18, 
        resizeMode: "contain"
    },
    LeaveTextStyle: {
        fontSize: 16, 
        fontFamily: fonts.medium, 
        color: color.darkGray, 
        marginLeft: 8
    },
    NavBarHeaderStyle: {
        backgroundColor: color.backgroundBlack,
        borderBottomWidth: 0,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, 
        shadowColor: color.backgroundBlack,
    },
    headerOpationsStyle: {headerStyle: {backgroundColor: color.backgroundBlack,
        shadowOpacity: 0}, headerShadowVisible: false, headerBackTitleVisible: false, 
      headerTitleStyle:{color:"white"}
    },
    homeCardContainer: {
        marginTop: 35,
        marginStart: 10,
        marginLeft: 10,
        backgroundColor: color.white,
        borderRadius: 12,
        width: 152,
        alignContent: 'center',
        paddingVertical: 15,
        paddingTop: 30,
        paddingHorizontal: 8,
        shadowColor: Colors.color.lightGray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
     },
     homeCardImg: {
        height: 45,
        width: 45,
        alignSelf: 'center',
        resizeMode: "contain",
        tintColor: color.backgroundBlack,
     },
     homeCardText: {
        width: "100%",
        height: 25,
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
        alignSelf: 'center',
        fontFamily: 'Asap-SemiBold',
        color: Colors.color.titleBlack,
        marginTop: 12,
     },
  
     homeCardContainerbottom: {
        marginTop: 10,
        backgroundColor: color.white,
        borderRadius: 12,
        paddingTop: 15,
        width: '100%',
        paddingBottom: 5,
        shadowColor: Colors.color.lightGray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: "center"
     },
     homeCardImgBottom: {
        height: 32,
        width: 32,
        alignSelf: 'center',
        resizeMode: "contain",
        tintColor: color.imageBlack,
  
     },
     homeCardTextbottom: {
        //width: 60,
        height: 30,
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: 'Asap-Medium',
        color: Colors.color.titleBlack,
        marginTop: 10,
        textAlign: "center",
     },
     NoDataLabel: {
        fontSize: 20, 
        fontFamily: fonts.semiBold, 
        color: color.subtitleBlack,
        alignSelf: "center", 
        marginTop: "60%"
     },
     ErrorText: {
        fontSize: 12, 
        fontFamily: fonts.medium, 
        color: color.darkRed, 
        marginTop: 4,
        marginLeft: 4 
    }
});