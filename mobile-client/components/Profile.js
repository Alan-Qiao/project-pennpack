import React, { useState, useEffect } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  getClassDataById,
  getUserClassesByUsername,
} from './Class';
import {
  getUserInfoByUsername,
  getUserInfo,
} from '../helpers/user';
import ClassGrid from './ClassGrid';
import { createChat } from './Message';

function Profile({ route, navigation }) {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [userClasses, setUserClasses] = useState([]);

  const fetchUserClasses = async () => {
    setUserClasses([]);
    const allClasses = await getUserClassesByUsername(username);
    if (allClasses.err) {
      alert(`An error occured: ${allClasses.err}`);
    }

    for (let i = 0; i < allClasses.length; i++) {
      const currClass = await getClassDataById(allClasses[i]);
      setUserClasses(oldArray => [...oldArray, currClass]);
    }
  };

  async function clickedChatWithMe() {
    // Check if the user is on their own profile
    const signedInUser = await getUserInfo();
    const signedInUsername = signedInUser.username;

    // If the user is not on their own profile
    if (username !== signedInUsername) {
      const { _id } = await getUserInfoByUsername(username);

      // Create a new chat if possible
      await createChat(_id);
    }
  }

  const fetchUserInfo = async () => {
    const signedInUser = await getUserInfo();
    setUser(signedInUser.name);
    setUsername(signedInUser.username);
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserClasses();
  }, []);

  return (
      <View style={styles.viewStyles}>
        <Text style={styles.titleText}>
          {user}
          , @
          {username}
        </Text>
        <ScrollView>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => clickedChatWithMe()}
          >
            <Image
              source={require('../assets/envelope.png')}
              style={{ width: 50, height: 50, margin: 20 }}
            />
            <Text style={styles.chatText}>
              Chat with me!
            </Text>
          </TouchableOpacity>
            <Text style={styles.subtitleText}>
              Analytics
            </Text>
            <Text style={styles.lightGreenText}>
              Enrolled classes
            </Text>
            <View style={{ flex: 7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <ClassGrid navigation={navigation} classes={userClasses} />
            </View>
            <Text style={styles.lightGreenText}>
              Contributions
            </Text>
            <Text style={styles.chatText}>
              Notes uploaded: 4
            </Text>
        </View>
        </ScrollView>
      </View>
  );
}

export default Profile;

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
  chatText: {
    color: '#898888',
    fontSize: 15,
    paddingBottom: 20,
  },
  lightGreenText: {
    color: 'rgba(176, 190, 169, .5)',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
  },
  subtitleText: {
    color: '#B0BEA9',
    fontFamily: 'arial',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'left',
  },
  titleText: {
    color: '#7EBAC7',
    fontFamily: 'arial',
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 20,
    textAlign: 'center',
  },
  viewStyles: {
    color: '#FFFFFF',
    flex: 1,
    padding: 20,
  },
});
