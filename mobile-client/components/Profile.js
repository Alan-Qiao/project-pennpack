import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
  const { username } = route.params;
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
    const { name } = await getUserInfoByUsername(username);
    setUser(name);
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

      </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    padding: 20,
    color: '#FFFFFF',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7EBAC7',
    paddingBottom: 20,
    fontFamily: 'arial',
  },
  chatText: {
    fontSize: 15,
    color: '#898888',
    paddingBottom: 20,
  },
  subtitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#B0BEA9',
    paddingBottom: 10,
    fontFamily: 'arial',
  },
  lightGreenText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'rgba(176, 190, 169, .5)',
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
