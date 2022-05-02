import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, TextInput, Image } from 'react-native';


function UserDashboard ({navigation}) {

    return (
      <View style = {{flex: 1, backgroundColor: '#FFFFFF'}}>
          <View><Text style={styles.titleText}>User Dashboard</Text></View>
          <View style = {{ flex: 2, flexDirection: "row", justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', flexWrap: "wrap" }}>
            <Pressable
            style={styles.button}>
                CIS 350
            </Pressable>
            <Pressable
            style={styles.button}>
                CIS 471
            </Pressable>
            <Pressable
            style={styles.button}>
                CIS 550
            </Pressable>
            <Pressable
            style={styles.button}>
                CIS 350
            </Pressable>
            <Pressable
            style={styles.button}>
                CIS 471
            </Pressable>
            <Pressable
            style={styles.button}>
                CIS 550
            </Pressable>
          </View>
      </View>
    )
  
}

export default UserDashboard;

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center",
        color: "#7EBAC7",
        paddingBottom: 10,
        flex: 1, 
        justifyContent: 'center',
         alignItems: 'center',
          backgroundColor: '#FFFFFF',
          flexWrap: 'wrap',
      paddingRight: 20,
      paddingLeft: 20,
      fontFamily:"Lato"
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
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'arial',
    paddingVertical: 12,
    color: "#9A8F97",
    fontWeight: "bold",
    width: 200,
    marginTop: 20,
    paddingLeft: 20,
    elevation: 3,
    borderRadius: 20,
    backgroundColor: "#E9E3E6",
  },
  button: {
    fontFamily: 'arial',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginRight: 10,
    marginLeft: 10,
    color: "#92AA83",
    fontWeight: "bold",
    width: 153,
    height: 153,
    elevation: 3,
    borderRadius: 20,
    backgroundColor: "#F1F7EE",
  }
});