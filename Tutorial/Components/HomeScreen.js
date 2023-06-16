import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.navigate("Teacher") }}>
        <Text style={styles.button}>Teacher</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate("Student") }}>
      <Text style={styles.button}>Student</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    borderColor:"red",
    borderWidth:1,
    padding:25,
    color:"white",
    backgroundColor:"black"
  },
});