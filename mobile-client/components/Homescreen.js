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
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7EBAC7',
    fontFamily: 'Lato',
  },
  button: {
    fontFamily: 'arial',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    color: '#3A405A',
    fontWeight: 'bold',
    width: 315,
    marginTop: 20,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: '#7EBAC7',
    borderColor: '#3A405A',
    borderWidth: 1,
    opacity: 0.5,
  },
});
