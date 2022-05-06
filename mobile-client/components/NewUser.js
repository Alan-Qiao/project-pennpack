import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
//import { setCurrentPlayer, addPlayer, checkPlayerExists } from '../modules/storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

function NewUser ({navigation}) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF'}}>
          <Text style={styles.titleText}>Create Account</Text>
          <Text style={styles.subtitleText}>Name:</Text>
          <TextInput style={styles.textInput}
            placeholder="Enter your name...">
          </TextInput>
          <Text style={styles.subtitleText}>Username:</Text>
          <TextInput style={styles.textInput}
            placeholder="Enter your username...">
          </TextInput>
          <Text style={styles.subtitleText}>Password:</Text>
          <TextInput style={styles.textInput}
            placeholder="Enter your password...">
          </TextInput>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('UserDashboard')}>
              Continue
          </Pressable>
        </View>
      )
  
}

export default NewUser;

const styles = StyleSheet.create({
    titleText: {
      fontSize: 50,
      fontWeight: "bold",
      textAlign: "center",
      color: "#7EBAC7",
      paddingBottom: 20,
      flexWrap: 'wrap',
      paddingRight: 20,
      paddingLeft: 20,
      fontFamily: 'Lato',
    },
    subtitleText: {
      fontSize: 20,
      textAlign: "left",
      color: "#898888",
      marginBottom:10
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
      width: 315,
      paddingLeft: 20,
      marginBottom: 20,
      elevation: 3,
      borderRadius: 10,
      backgroundColor: "#F1F7EE",
    },
    button: {
      fontFamily: 'arial',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      color: "#3A405A",
      width: 315,
      marginTop: 20,
      elevation: 3,
      borderRadius: 10,
      borderColor: "#3A405A",
      backgroundColor: "#7EBAC7"
    }
  });