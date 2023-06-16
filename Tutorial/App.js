import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Teacher from "./Components/Teacher"
import Student from "./Components/Student"
import HomeScreen from "./Components/HomeScreen"
import Camera from "./Components/Camera"


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component = {HomeScreen}/>
          <Stack.Screen name="Teacher" component = {Teacher}/>
          <Stack.Screen name="Student" component = {Student}/>
          <Stack.Screen name="Camera" component = {Camera}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}