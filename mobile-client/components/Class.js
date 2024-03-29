import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import {
  createClass,
  getClasses,
  getAllUserClasses,
  getAllUserClassesByUsername,
  joinClass,
  readClass,
  readClassById,
} from '../api/services';

export const getUserClasses = async () => {
  try {
    const { userClasses } = await getAllUserClasses();
    return userClasses;
  } catch (e) {
    return e.message;
  }
};

export const getUserClassesByUsername = async username => {
  try {
    const { userClasses } = await getAllUserClassesByUsername(username);
    return userClasses;
  } catch (e) {
    return e.message;
  }
};

export const getAllClasses = async () => {
  try {
    const { classes } = await getClasses();
    return classes;
  } catch (e) {
    return e.message;
  }
};

export const createNewClass = async (className, professor) => {
  try {
    const res = await createClass(className, professor);
    return res;
  } catch (e) {
    return e.message;
  }
};

export const joinNewClass = async classId => {
  try {
    const data = await joinClass(classId);
    return data;
  } catch (e) {
    return { err: e.message };
  }
};

export const getClassDataById = async id => {
  try {
    const data = await readClassById(id);
    return data;
  } catch (err) {
    console.log(`${id} trigger this error: ${err.message}`);
    return { id, err: err.message };
  }
};

export const getClassData = async name => {
  try {
    const data = await readClass(name);
    return data;
  } catch (err) {
    console.log(`${name} trigger this error: ${err.message}`);
    return { name, err: err.message };
  }
};

export const dayTitle = ({ type, date, topic }) => {
  const datePieces = date.split('-');
  const month = Number(datePieces[1]);
  const day = Number(datePieces[2]);
  const shortDate = `${month}/${day}`;
  return `${type} ${shortDate}: ${topic}`;
};

function ClassIcon({ navigation, classId, className, mode }) {
  const handleClick = async () => {
    console.log('in handleClick of classIcon');
    if (mode === 'join') {
      const err = await joinNewClass(classId);
      if (err) {
        if (err === 'user in class') {
          alert('You have already enrolled in this class');
        }
        alert(`An error occured: ${err}`);
      }
    }
    navigation.navigate('ClassDashboard', {
      className,
    });
  };

  return (
    <View>
      <Pressable
        onPress={() => handleClick()}
        style={styles.button}
      >
        <Text>{className}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#F1F7EE',
    borderRadius: 20,
    color: '#92AA83',
    elevation: 3,
    fontFamily: 'arial',
    fontWeight: 'bold',
    height: 140,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    margin: 5,
    paddingVertical: 10,
    width: 140,
  },
});

export default ClassIcon;
