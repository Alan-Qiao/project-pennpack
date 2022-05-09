import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

function Homescreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
        <Text style={styles.titleText}>PennPack</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}
          >
              <Text>New User</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
             <Text>Login</Text>
          </Pressable>

      </View>
  );
}

export default Homescreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#7EBAC7',
    borderColor: '#3A405A',
    borderRadius: 10,
    borderWidth: 1,
    color: '#3A405A',
    elevation: 3,
    fontFamily: 'arial',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 20,
    opacity: 0.5,
    paddingVertical: 12,
    width: 315,
  },
  titleText: {
    color: '#7EBAC7',
    fontFamily: 'arial',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
