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

const FloatTextField = ({
  containerStyle,
  textInputStyle,
  textInputMultiline,
  textInputLines,
  leftImagePath,
  rightImagePath,
  defaultValue,
  isPasswordField,
  value,
  placeholder,
  editable,
  keyboardType,
  showError,
  errorText,
  onTextChange = () => {},
  pickerLabel,
  pickerLabelStyle,
}) => {
  const [hidePswrdText, setHidePswrdText] = useState(true);
  const [textValue, setTextValue] = useState(defaultValue);
  const showErrMsg = showError;//(showError == pickerLabel) ? true : false;
  return (
    <View style={{ marginBottom: 24,}}>
    <View style={[styles.container, containerStyle, {borderColor: showErrMsg ? color.darkRed : Colors.color.lightGray}]}>
        {(textValue != "" && textValue != undefined) ? <View style={{ marginLeft: 12,
            marginTop: -8, alignItems: "baseline"}}>
              <Text style={[styles.LabelStyle, pickerLabelStyle]}> 
                {pickerLabel} 
              </Text>
          </View> : null}

        <View style={{borderColor: color.red, borderWidth: 0, paddingHorizontal: 8, marginTop: (textValue != "" && textValue != undefined) ? -2 : 4, flexDirection: "row", justifyContent: "center", width: '100%'}}>
            {(leftImagePath != null) ? <View style={CustomStyling.fieldSubView}><Image source={leftImagePath}
                style={CustomStyling.fieldImage}/> 
                </View>: null
            }
            <TextInput
                style={[CustomStyling.fieldText, {width: (leftImagePath != null) ? ((isPasswordField || (rightImagePath != null)) ? '80%' : '90%') : ((isPasswordField || (rightImagePath != null)) ? '90%' : '100%')}, textInputStyle]}
                multiline={textInputMultiline}
                numberOfLines={textInputLines}
                placeholder={placeholder}
                onChangeText = {val => {onTextChange(val);
                    setTextValue(val);
                }}
                editable={editable}
                keyboardType={keyboardType}
                defaultValue={defaultValue}
                value={value}
                secureTextEntry={(isPasswordField) ? hidePswrdText : false}
                color={color.subtitleBlack}
                placeholderTextColor={color.lightGray}
                textAlignVertical="top"
            />
                
          {(isPasswordField) ? <TouchableOpacity onPress={() => setHidePswrdText(!hidePswrdText)} style={CustomStyling.fieldSubView}>
              <Image source={hidePswrdText ? require('../images/eye.png') :require('../images/slashEye.png')}
                style={CustomStyling.passwordImage}/>
           </TouchableOpacity> : null}

           {(rightImagePath != null) ? <View style={CustomStyling.fieldSubView}>
              <Image source={rightImagePath}
                style={CustomStyling.fieldImage}/> 
              </View>: null
            }
      </View>
    </View>
   {(showErrMsg) ? <Text style={CustomStyling.ErrorText}>{errorText}</Text>:null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // elevation: 1,
   // width: '19%',
    // zIndex: 1000,
    height: 50, 
    backgroundColor: color.white,
    borderWidth:1, 
    borderColor: Colors.color.lightGray, 
    borderRadius: 8, 
  },
  LabelStyle: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: color.titleBlack,
    
    backgroundColor: color.white,
  },
});

export default FloatTextField;
