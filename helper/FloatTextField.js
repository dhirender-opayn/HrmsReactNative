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
  onTextChange = () => {},
  passID = () => {},
  pickerLabel,
  pickerLabelStyle,
}) => {
  // console.log('PICKER DATA', pickerData);
  const [hidePswrdText, setHidePswrdText] = useState(true);
  const [textValue, setTextValue] = useState(defaultValue);
  return (
    <View style={[styles.container, containerStyle]}>
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
                    onChangeText={val => {onTextChange(val);
                        setTextValue(val);
                    }}
                    defaultValue={defaultValue}
                    value={value}
                    secureTextEntry={(isPasswordField) ? hidePswrdText : false}
                    color={color.subtitleBlack}
                    placeholderTextColor={color.lightGray}
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
    marginBottom: 24,
    
  },
  LabelStyle: {
    fontSize: 12,
   // fontFamily: fonts.InterMedium,
    color: color.titleBlack,
    
    backgroundColor: color.white,
  },
});

export default FloatTextField;
