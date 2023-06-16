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
  const [total, setTotal] = useState()
  const [percentage, setPercentage] = useState(0)
  const [color, setColor] = useState("red")

  async function fetchData() {
    const res = await axios.get("http://172.20.10.11:8080/student/")
    return res.data
  }

  async function fetchTotal() {
    const res = await axios.get("http://172.20.10.11:8080/subject/")
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

    calculate()

  }, [props.name, props.subject])

  useEffect(() => {

  }, [color])
  function calculate() {
    const value = (65 / 100) * 100
    console.log("value " + value)
    setPercentage(value)

    if (value >= 75) {
      setColor("green")
    }
    else if (value > 60 && value < 75) {
      setColor("orange")
    }
    else {
      setColor("red")
    }
  }

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
    <View style={{ width: 175, alignItems: 'center', marginRight: 18 }}>
      <Pie
        radius={90}
        innerRadius={65}
        sections={[
          {
            percentage: percentage,
            color: color,
          },
        ]}
        backgroundColor="#ddd"
      />
      <View
        style={styles.gauge}
      >
        <Text
          style={styles.gaugeText}
        >
          {percentage}%
      </Text>
      </View>
      <View style={styles.subjectContainer}>
        <Text style={styles.subjectText}>{props.subject.toUpperCase()}</Text>
      </View>
      <View style={styles.texts}>
        <Text style={styles.attendedText}>Classes Attended: {attendance}</Text>
        <Text style={styles.classesText}>Number of classes: {total}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: 1050, marginRight: 90 },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
    textAlign: 'center', // Align the text in the center horizontally
  },
  attendanceValue: {
    textAlign: 'center',
    fontSize: 18,
  },
  attendedText: {
    fontSize: 16,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  classesText: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'gray',
    backgroundColor: '#fff',
    width:200
  },
  classesValue: {
    textAlign: 'center',
    fontSize: 18,
  },
  subjectText: {
    fontWeight: "bold",
    fontSize: 18
  },
  texts:{
    position:"absolute",
    borderColor:"gray",
    // borderWidth:1,
    marginRight:10,
    bottom:-160
  },
  subjectContainer:{
    position:"absolute",
    borderColor:"gray",
    // borderWidth:1,
    bottom:-60,
    right:100
  }
})