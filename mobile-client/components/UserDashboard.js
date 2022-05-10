import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import ClassGrid from './ClassGrid';
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
    const curClasses = [];
    for (let i = 0; i < allClasses.length; i++) {
      curClasses.push(getClassDataById(allClasses[i]));
    }
    const newClasses = await Promise.all(curClasses);
    setUserClasses(() => newClasses);
  };

  useEffect(() => {
    fetchUserClasses();
  }, []);

  return (
      <View style={styles.viewStyles}>
          <Text style={styles.titleText}>Dashboard</Text>
          <ScrollView>
            <View style={{ flex: 7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <ClassGrid navigation={navigation} classes={userClasses} />
            </View>
          </ScrollView>
      </View>
  );
}

export default UserDashboard;

const styles = StyleSheet.create({
  titleText: {
    alignItems: 'center',
    color: '#7EBAC7',
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'arial',
    fontSize: 40,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 30,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  viewStyles: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
});

/*
button: {
    alignItems: 'center',
    backgroundColor: '#F1F7EE',
    borderRadius: 20,
    color: '#92AA83',
    elevation: 3,
    fontFamily: 'arial',
    fontWeight: 'bold',
    height: 153,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    width: 153,
  },
  errorText: {
    fontSize: 12,
    textAlign: 'left',
    // float: 'left',
    fontWeight: 'bold',
    marginTop: 30,
    color: '#D94A4A',
  },
  nameText: {
    fontSize: 20,
    textAlign: 'left',
    // float: 'left',
    paddingLeft: 50,
  },
  textInput: {
    alignItems: 'center',
    backgroundColor: '#E9E3E6',
    borderRadius: 20,
    color: '#9A8F97',
    elevation: 3,
    fontFamily: 'arial',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginTop: 20,
    paddingLeft: 20,
    paddingVertical: 12,
    width: 200,
  },
*/
