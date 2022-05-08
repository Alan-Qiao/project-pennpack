import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
import { loginUser } from '../helpers/user';

function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const err = await loginUser(username, password);
    setError(err);
    if (!err) {
      // navigation.navigate('UserDashboard');
      navigation.navigate('Contacts');
    }
  };

  return (
      <View style={styles.viewStyles}>
        <Text style={styles.titleText}>Login</Text>
        <Text style={styles.subtitleText}>Username:</Text>
        <TextInput
          style={styles.textInput}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter your name..."
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
        { error && <Text style={styles.errorText}>{error}</Text> }
      </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    color: '#FFFFFF',
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7EBAC7',
    paddingBottom: 20,
    fontFamily: 'Lato',
  },
  subtitleText: {
    fontSize: 20,
    textAlign: 'left',
    color: '#898888',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    textAlign: 'left',
    float: 'left',
    paddingLeft: 50,
  },
  errorText: {
    fontSize: 12,
    textAlign: 'left',
    float: 'left',
    fontWeight: 'bold',
    marginTop: 30,
    color: '#D94A4A',
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'arial',
    paddingVertical: 12,
    color: '#9A8F97',
    fontWeight: 'bold',
    width: 315,
    paddingLeft: 20,
    marginBottom: 20,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: '#F1F7EE',
  },
  button: {
    fontFamily: 'arial',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    color: '#3A405A',
    width: 315,
    marginTop: 20,
    elevation: 3,
    borderRadius: 10,
    borderColor: '#3A405A',
    backgroundColor: '#7EBAC7',
  },
});
