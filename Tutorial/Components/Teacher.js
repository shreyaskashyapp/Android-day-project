import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Teacher({ navigation }) {
  const [password, setPassword] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    async function process() {
      if (password === '1') {
        setSubject('softwareTesting');
      } else if (password === '2') {
        setSubject('fileStructures');
      } else if (password === '3') {
        setSubject('dataMining');
      } else if (password === '4') {
        setSubject('webTechnology');
      } else {
        console.log('Invalid');
      }
    }
    process();
  }, [password]);

  function handleChange(text) {
    setPassword(text);
  }

  function handlePress() {
    console.log('Button pressed');
    navigation.navigate('Camera', { subject });
  }

  return (
    <View style={styles.container}>
      <View style={styles.greetContainer}>
        <Text style={styles.greet}>WELCOME</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={handleChange}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetContainer: {
    marginBottom: 20,
  },
  greet: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
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