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
      navigation.navigate('Navbar', { screen: 'UserDashboard' });
      // navigation.navigate('Contacts');
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
        { error ? <Text style={styles.errorText}>{error}</Text> : null }
      </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(126, 186, 199, .24)',
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
    // float: 'left',
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
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
    fontFamily: 'arial',
    fontSize: 50,
    fontWeight: 'bold',
    paddingBottom: 20,
    textAlign: 'center',
  },
  viewStyles: {
    color: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
});
