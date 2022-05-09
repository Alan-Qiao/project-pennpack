import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function Navbar() {
  return (
    <View styles={styles.viewStyles}>
      <View style={{ flex: 1 }}>
        <Pressable>
          <Text>Dashboard</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable>
          <Text>Chat</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable>
          <Text>Classes</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <Pressable>
          <Text>Profile</Text>
        </Pressable>
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
