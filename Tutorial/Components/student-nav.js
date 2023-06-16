import React from 'react'
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator }from '@react-navigation/bottom-tabs'
import Pie from './pie'
import Student from "./Student"
import Internals from "./Internals"
import Board from "./board"
import Settings from "./settings"

const Tab= createBottomTabNavigator()

export default function StudentNav(){
  return(
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Student} options={{ headerShown: false }}/>
        <Tab.Screen name="Internals" component={Internals} options={{ headerShown: false }}/>
        <Tab.Screen name="Board" component={Board} options={{ headerShown: false }}/>
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}