import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function Navbar({ navigation }) {
  return (
    <View styles={styles.viewStyles}>
      <View style={{ flex: 1 }}>
        <Pressable>
          <Text>Dashboard</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable>Chat</Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable>Classes</Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable>Profile</Pressable>
      </View>
    </View>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  viewStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
});
