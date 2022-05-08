import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
import { signupUser } from '../helpers/user';

function SignUp ({navigation}) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = () => {
    console.log('in handleSubmit');
    const err = signupUser(name, username, password);
    console.log(err);
    setError(err);
    if (!err) {
      navigation.navigate('Login');
    }
  };

  return (
      <View style={styles.viewStyles}>
        <Text style={styles.titleText}>Create Account</Text>
        <Text style={styles.subtitleText}>Name:</Text>
        <TextInput style={styles.textInput}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name...">
        </TextInput>
        <Text style={styles.subtitleText}>Username:</Text>
        <TextInput style={styles.textInput}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your username...">
        </TextInput>
        <Text style={styles.subtitleText}>Password:</Text>
        <TextInput style={styles.textInput}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password...">
        </TextInput>
        <Pressable
          style={styles.button}
          onPress={() => handleSubmit()}>
            <Text>Continue</Text>
        </Pressable>
        { error && <Text style={styles.errorText}>{error}</Text> }
      </View>
    )
  
}

export default SignUp;

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    color: "#FFFFFF"
  },
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
    marginBottom: 10,
    textAlign: "left"
  },
  nameText: {
      fontSize: 20,
      textAlign: "left",
      paddingLeft: 50
  },
  errorText: {
    fontSize: 12,
    textAlign: "center",
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