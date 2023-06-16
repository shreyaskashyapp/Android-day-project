import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Doughnut from "./pie"

export default function Student({ navigation }) {
  const [subject, setSubject] = useState("softwareTesting");
  const [name, setName] = useState("Shreyas");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text>Name:</Text>
        <Picker
          selectedValue={name}
          style={styles.picker}
          onValueChange={handleNameChange}
        >
          <Picker.Item label="Shreyas" value="Shreyas" />
          <Picker.Item label="Saatvik" value="Saatvik" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text>Subject:</Text>
        <Picker
          selectedValue={subject}
          style={styles.picker}
          onValueChange={handleSubjectChange}
        >
          <Picker.Item label="Software Testing" value="softwareTesting" />
          <Picker.Item label="File Structures" value="fileStructures" />
        </Picker>
      </View>

      <View style={styles.doughnutContainer}>
        <Doughnut name={name} subject={subject}/>
      </View>

      <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end', // Align items to the right side
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginRight:10,
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 200, // Set a specific width for the container
    height:40,
    justifyContent: 'space-between', // Align items along the horizontal axis
  },
  picker: {
    flex: 1, // Allow the picker to take up remaining space
    height: 50,
  },
  doughnutContainer: {
    marginTop: 100,
    marginRight:80,
    alignItems: 'center', // Center align items horizontally
    justifyContent: 'center', // Center align items vertically
  },
});