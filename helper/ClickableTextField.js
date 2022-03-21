import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Colors, { color } from "../Common/Colors";
import fonts from "../Common/fonts";
import { CustomStyling } from "../CustomStyle/CustomStyling";
import ImagesPath from "../images/ImagesPath";

const ClickabletextField = ({
  containerStyle,
  textInputStyle,
  imageStyle,
  showError,
  errorText,
  rightImagePath,
  defaultValue,
  isPasswordField,
  value,
  onTouch = () => {},
  pickerLabel,
  pickerLabelStyle,
}) => {
  const [hidePswrdText, setHidePswrdText] = useState(true);
  const [textValue, setTextValue] = useState(value);
  return (
    <View style ={[{ marginBottom: 24 }, containerStyle]}>
    <View style={[styles.container, {borderColor: (showError) ? color.darkRed : color.lightGray}]}>
        {(value != "" && value != undefined) ? <View style={{ marginLeft: 14, fontFamily: fonts.regular,
    marginTop: -8, alignItems: "baseline"}}><Text style={[styles.LabelStyle, pickerLabelStyle]}> {pickerLabel} </Text>
        </View> : null}

        <TouchableOpacity style={{borderColor: color.red, borderWidth: 0, paddingHorizontal: 8, 
          marginTop: (value != "" && value != undefined) ? -2 : 4, flexDirection: "row", justifyContent: "center", width: '100%'}}
          onPress = {() => {onTouch()}}  
        >
            <View style={{width: (rightImagePath != null) ? '90%' : '100%', height: 40, justifyContent: "center"}}>
              <Text
                style={[{marginTop: 0, fontSize: 16, fontFamily: fonts.regular}, textInputStyle]}
              >
                {(value == "") ? defaultValue : value}
              </Text>
                </View>
                
           {(rightImagePath != null) ? <View style={[{width: '10%', justifyContent: "center"}, imageStyle]}>
             <Image source={rightImagePath}
                style={{ height: 20, width: 20, tintColor: color.imageBlack}}/> 
                </View>: null
            }
      </TouchableOpacity>
    </View>
    {(showError) ? <Text style={CustomStyling.ErrorText}>{errorText}</Text>: null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // elevation: 1,
   // width: '19%',
    // zIndex: 1000,
    height: 50, 
    borderWidth:1, 
    borderColor: Colors.color.lightGray, 
    borderRadius: 8, 
    minHeight: 50,
    maxHeight: 200,
  },
  pickerView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -8,
  
  },
  pickerContainer: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: color.lightGray,
    // borderRadius: w(0.3),
    backgroundColor: color.white,
    elevation: 5,
    zIndex: 1,
    position: "absolute",
    top: 40,
  },
  pickerItemStyle: {
    borderTopWidth: 1,
    borderColor: "lightgray",
    justifyContent: "center",
    height: 40,
  },
  selectedText: {
    fontSize: 16,
    color: "black",
  },
  containerItemStyle: {
    marginLeft: 10,
    color: color.black,
    //fontFamily: fonts.InterRegular,
    fontSize: 16,
  },
  placeholderText: {
    color: color.darkGray,
    fontSize: 16,
  },
  LabelStyle: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: color.black,
    backgroundColor: color.white,
  },
});

export default ClickabletextField;
