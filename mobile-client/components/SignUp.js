import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
import { signupUser } from '../helpers/user';

function SignUp({ navigation }) {
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
        <TextInput
          style={styles.textInput}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name..."
        />
        <Text style={styles.subtitleText}>Username:</Text>
        <TextInput
          style={styles.textInput}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your username..."
        />
        <Text style={styles.subtitleText}>Password:</Text>
        <TextInput
          style={styles.textInput}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />
        <Pressable
          style={styles.button}
          onPress={() => handleSubmit()}
        >
            <Text>Continue</Text>
        </Pressable>
        { error ? <Text style={styles.errorText}>{error}</Text> : null }
      </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#7EBAC7',
    borderColor: '#3A405A',
    borderRadius: 10,
    color: '#3A405A',
    elevation: 3,
    fontFamily: 'arial',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 10,
    width: 315,
  },
  errorText: {
    color: '#D94A4A',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
  },
  subtitleText: {
    color: '#898888',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'left',
  },
  textInput: {
    alignItems: 'center',
    backgroundColor: '#F1F7EE',
    borderRadius: 10,
    color: '#9A8F97',
    elevation: 3,
    fontFamily: 'arial',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 20,
    paddingLeft: 20,
    paddingVertical: 12,
    width: 315,
  },
  titleText: {
    color: '#7EBAC7',
    flexWrap: 'wrap',
    fontFamily: 'arial',
    fontSize: 50,
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  viewStyles: {
    color: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
});

/*
nameText: {
    fontSize: 20,
    paddingLeft: 50,
    textAlign: 'left',
  },
*/
