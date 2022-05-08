import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ClassGrid from './ClassGrid';
import Navbar from './Navbar';
import { getClassDataById, getUserClasses } from './Class';

function UserDashboard({ navigation }) {
  const [userClasses, setUserClasses] = useState([]);

  const fetchUserClasses = async () => {
    console.log('in fetchUserClassees');
    const allClasses = await getUserClasses();
    if (allClasses.err) {
      alert(`An error occured: ${allClasses.err}`);
    }

    // Need to get each individual class (need id, classname)
    for (let i = 0; i < allClasses.length; i++) {
      const currClass = await getClassDataById(allClasses[i]);
      setUserClasses(oldArray => [...oldArray, currClass]);
    }
  };

  useEffect(() => {
    fetchUserClasses();
  }, []);

  return (
      <View style={styles.viewStyles}>
          <Navbar />
          <Text style={styles.titleText}>User Dashboard</Text>
          <View style={{ flex: 7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <ClassGrid navigation={navigation} classes={userClasses} />
          </View>
          {/* <Navbar /> */}
      </View>
  );
}

export default UserDashboard;

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  titleText: {
    marginTop: 30,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7EBAC7',
    paddingBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: 'Lato',
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
    width: 200,
    marginTop: 20,
    paddingLeft: 20,
    elevation: 3,
    borderRadius: 20,
    backgroundColor: '#E9E3E6',
  },
  button: {
    fontFamily: 'arial',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginRight: 10,
    marginLeft: 10,
    color: '#92AA83',
    fontWeight: 'bold',
    width: 153,
    height: 153,
    elevation: 3,
    borderRadius: 20,
    backgroundColor: '#F1F7EE',
  },
});
