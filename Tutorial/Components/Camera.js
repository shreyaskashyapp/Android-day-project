import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, StyleSheet,Text } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';

export default function CameraComponent({ navigation, route }) {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
  console.log(route.params.subject);

  async function checkPermission() {
    const newCameraPermission = await Camera.requestCameraPermission();
    return newCameraPermission;
  }

  async function takePicture() {
    if (camera.current) {
      const imageData = await camera.current.takePhoto();
      setPhoto(imageData.path);
    }
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
    } catch (error) {
      console.error('Error converting image to base64:', error);
    }
  }

  if (!device) return null;
  function handlePress(){
    sendBase64ToPython(image);
  }

  function handleRetake(){
    setImage("")
  }

  return (
    <View style={styles.container}>
      {!image && (
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
      )}
      {!image && (
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        </TouchableOpacity>
      )}
      {image && (
        <View>
          <Image
            source={{ uri: `data:image/png;base64,${image}` }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleRetake}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        </View>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  },
  camera: {
    flex: 1,
    width: '100%', // Ensure the camera takes the full width
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
    width: 350, // Adjust the width as desired
    height: 350,
  },
  button: {
    marginTop: 20, // Add some spacing between the image and the button
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});