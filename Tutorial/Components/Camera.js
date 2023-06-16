import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';

export default function CameraComponent({navigation,route}) {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [photo, setPhoto] = useState();
  const [image, setImage] = useState();
  console.log(route.params.subject)

  async function checkPermission() {
    const newCameraPermission = await Camera.requestCameraPermission();
    return newCameraPermission;
  }

  async function takePicture() {
    const imageData = await camera.current.takePhoto();
    setPhoto(imageData.path);
  }

  async function sendBase64ToPython(base64String) {
    try {
      console.log(base64String);
      const response = await axios.post('http://172.20.10.11:8082/process', {
        base64String: base64String,
        subject: route.params.subject,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending base64 string to Python:', error);
    }
  }

  useEffect(() => {
    checkPermission().then((data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (photo) {
      convertToBase64(photo);
    }
  }, [photo]);

  async function convertToBase64(imagePath) {
    try {
      const base64Data = await RNFetchBlob.fs.readFile(imagePath, 'base64');
      setImage(base64Data);
      sendBase64ToPython(base64Data);
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  }

  if (device == null) return null;

  return (
    <>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity
        style={styles.captureButton}
        onPress={takePicture}
      />
      {image && (
        <Image
          source={{ uri: `data:image/png;base64,${image}` }}
          style={styles.image}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});