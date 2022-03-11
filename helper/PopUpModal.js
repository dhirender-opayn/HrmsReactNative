import React, {useState} from 'react';
import {Text, StyleSheet, Pressable, View, Modal} from 'react-native';

import Colors, {color} from '../Common/Colors';

const PopUpModal = ({onPressCancel, onPressGallery, onPressCamera}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
          <Text onPress={onPressCamera} style={styles.cameratext}>
            Open Camera
          </Text>
          <View style={styles.lineview}></View>

          <Text onPress={onPressGallery} style={styles.gallerytext}>
            Open Gallery
          </Text>
          <View style={styles.lineview}></View>
          <Text onPress={onPressCancel} style={styles.cancelmodal}>
            Cancel
          </Text>
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
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '75%',
  },
  gallerytext: {
    color: color.black,
    fontSize: 16,

    marginTop: 24,
  },
  cameratext: {
    color: color.black,
    fontSize: 16,

  },
  cancelmodal: {
    color: color.red,
    fontSize: 16,
    marginTop: 24,
  },
  lineview: {
    height:1,
    width: '80%',
    marginTop: 24,
    backgroundColor: '#808B96',
  },
});
export default PopUpModal;
