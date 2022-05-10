import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { getClassData, dayTitle } from './Class';
import { readClassDays } from '../api/services';

function ClassDashboard({ route, navigation }) {
  const { className } = route.params;
  const [prof, setProf] = useState('');
  const [classId, setClassId] = useState('');
  const [days, setDays] = useState([]);

  async function fetchClassData() {
    const data = await getClassData(className);
    setClassId(data._id);
    if (data.err) {
      alert(`An Error Occured: ${data.err}`);
    } else {
      setProf(data.professor);
      setDays(data.classDays);
    }
  }

  const addClassDate = () => {
    navigation.navigate('AddClassDay', {
      className,
    });
  };

  const clickedClassDay = dayId => {
    navigation.navigate('ClassDay', {
      id: dayId,
      className,
    });
  };

  useEffect(() => {
    fetchClassData();
  }, []);

  // Fetches from the database every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const classDays = await readClassDays(classId);
      setDays(classDays);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
      <View style={styles.viewStyles}>
        <Text style={styles.titleText}>{className.toUpperCase()}</Text>
        <Text style={styles.subtitleText}>{prof}</Text>
        <Pressable
          onPress={() => addClassDate()}
          style={styles.addButton}
        >
          <Text>
            + Add Class Date
          </Text>
        </Pressable>
        {
          days.map(day => (
            <Pressable
              key={day._id}
              onPress={() => clickedClassDay(day._id)}
              style={styles.button}
            >
              <Text>
                {dayTitle(day.type, day.date, day.topic)}
              </Text>
            </Pressable>
          ))
        }

      </View>
  );
}

export default ClassDashboard;

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: '#E0EDC5',
    borderColor: '#3A405A',
    borderRadius: 10,
    color: '#3A405A',
    elevation: 3,
    fontFamily: 'arial',
    marginTop: 20,
    paddingVertical: 10,
    width: 315,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F1F7EE',
    borderColor: '#3A405A',
    borderRadius: 10,
    color: '#3A405A',
    elevation: 3,
    fontFamily: 'arial',
    marginTop: 10,
    paddingVertical: 10,
    width: 315,
  },
  subtitleText: {
    color: '#898888',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'left',
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
    padding: 30,
  },
});

/*
nameText: {
    fontSize: 20,
    textAlign: 'left',
    // float: 'left',
    paddingLeft: 50,
  },
    errorText: {
    color: '#D94A4A',
    fontSize: 12,
    // float: 'left',
    fontWeight: 'bold',
    marginTop: 30,
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
*/
