import Pie from 'react-native-pie'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default function Doughnut(props) {
  console.log(props)
  const [data, setData] = useState()
  const [attendance, setAttendance] = useState()
  const [subjectData, setsubjectData] = useState()
  const [total,setTotal]= useState()

  async function fetchData() {
    const res = await axios.get("http://172.20.10.11:8080/student/")
    return res.data
  }

  async function fetchTotal() {
    const res= await axios.get("http://172.20.10.11:8080/subject/")
    return res.data
  }

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data)
        processData()
      })

      fetchTotal()
      .then((data) => {
        setsubjectData(data)
      })

  }, [props.name, props.subject])

  function processData() {
    for (let i = 0; i < data.length; i++) {
      if (data[i]['name'] === props.name) {
        setAttendance(data[i][props.subject])
        setTotal(subjectData[0][props.subject])
      }
    }
  }
  console.log(attendance)
  return (
    <View>
      <Pie
        radius={80}
        innerRadius={75}
        sections={[
          {
            percentage: 20,
            color: '#f00',
          },
        ]}
        backgroundColor="#ddd"
      />
      <Text>Classes Attended:{attendance}</Text>
      <Text>Number of classes:{total}</Text>
    </View>
  )
}