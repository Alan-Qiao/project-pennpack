import { React, useEffect, useState } from 'react';
import { Pressable, View, Text, StyleSheet, TextInput, Image } from 'react-native';
import '../styles/ClassDashboard.css';
import Navbar from '../components/Navbar';
import { getClassData, dayTitle } from '../components/Class';
import { navigate, id, prof, days} from '../components/ClassDashboard';

function ClassDashboardMobile() {

  useEffect(() => {
    const data = getClassData(id);
    if (data.err) {
      alert(`An Error Occured: ${data.err}`);
      navigate(-1);
    } else {
      setProf(data.prof);
      setDays(data.days);
    }
  }, []);

  return days.map(day => (
    <View>
        <Button
          key={day.id}
          title= {dayTitle(day)}
          style={styles.button2}
          onClick={() => navigate(`/classNoteMobile/${day.id}`)}
        />
          </View>  
        
    )) (
    <View style = {{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View><Text style={styles.titleText}>{id.toUpperCase()}</Text></View>
      <View><Text style={styles.subTitleText}>{prof}</Text></View>
      <Button
        title=" + Add Class Date"
        style={styles.button1}
        onPress={() => navigate(`/classDashboardMobile/${id}/addclassnoteMobile`)}
      />
      <Navbar />
      </View>
      
       
       

      
    
     
      
        
  );
}

export default ClassDashboard;

const styles = StyleSheet.create({
  titleText: {
    position: "relative",
    fontFamily: "'Lato', sans-serif",
    color: "#7EBAC7",
    fontSize: "60px",
    marginTop: "10px",
    marginBottom: "10px",
    left: "10%",
    textAlign: "left"
    },
  subTitleText: {
    position: "relative",
    fontFamily: "'Lato', sans-serif",
    color: "#898888",
    fontSize: "32px",
    marginTop: "10px",
    marginBottom: "50px",
    left: "10%",
    textAlign: "left"
  },
nameText: {
    fontSize: 20,
    textAlign: "left",
    float: "left",
    paddingLeft: 50
},
errorText: {
  fontSize: 12,
  textAlign: "left",
  float: "left",
  fontWeight: "bold",
  marginTop: 30,
  color: "#D94A4A"
},
button1: {
  width: "900px",
  height: "60px",
  border: ["1px solid #3a5a3d", "1px solid #92AA83"],
  backgroundColor: "#E0EDC5",
  padding: "10px",
  textAlign: ["center", "center"],
  textDecoration: "bold",
  fontStyle: "normal",
  fontSize: "18px",
  lineHeight: "25px",
  borderRadius: "10px",
  margin: "10px"
},
button2: {
  width: "900px",
  height: "60px",
  backgroundColor: "#F1F7EE",
  border: "1px solid #92AA83",
  padding: "10px",
  textAlign: ["center", "center"],
  textDecoration: "bold",
  fontStyle: "normal",
  fontSize: "18px",
  lineHeight: "25px",
  borderRadius: "10px",
  margin: "10px"
}
});