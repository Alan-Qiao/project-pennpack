import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
import { getClassData, dayTitle } from './Class';

function AddClassDay({ route, navigation }) {
  const { className } = route.params;
  const [type, setType] = useState('');
  const [date, setDate] = useState(new Date(Date.now()).toISOString().substring(0, 10));
  const [topic, setTopic] = useState('');
  const [incomplete, setIncomplete] = useState(false);

  const [lectureClicked, setLectureClicked] = useState(0);
  const [recitationClicked, setRecitationClicked] = useState(0);
  const [seminarClicked, setSeminarClicked] = useState(0);

  function handleSubmit() {
    console.log('clicked submit');
  }

  function clickedLecture() {
    setLectureClicked(1);
    setRecitationClicked(0);
    setSeminarClicked(0);
    setType('Lecture');
  }

  function clickedRecitation() {
    setLectureClicked(0);
    setRecitationClicked(1);
    setSeminarClicked(0);
    setType('Recitation');
  }

  function clickedSeminar() {
    setLectureClicked(0);
    setRecitationClicked(0);
    setSeminarClicked(1);
    setType('Seminar');
  }

  return (
      <View style={styles.viewStyles}>
        <Text style={styles.titleText}>Adding a new class day</Text>
        <Text style={styles.subtitleText}>Type of class</Text>
        <Pressable
          style={lectureClicked ? styles.buttonPressed : styles.button}
          onPress={() => clickedLecture()}
        >
          <Text>
            Lecture
          </Text>
        </Pressable>
        <Pressable
          style={seminarClicked ? styles.buttonPressed : styles.button}
          onPress={() => clickedSeminar()}
        >
          <Text>
            Seminar
          </Text>
        </Pressable>
        <Pressable
          style={recitationClicked ? styles.buttonPressed : styles.button}
          onPress={() => clickedRecitation()}
        >
          <Text>
            Recitation
          </Text>
        </Pressable>
        <Text style={styles.subtitleText}>Date</Text>
        <TextInput
          style={styles.textInput}
          onChange={e => setDate(e.target.value)}
          placeholder="Enter date..."
        />
        <Text style={styles.subtitleText}>Topic</Text>
        <TextInput
          style={styles.textInput}
          onChange={e => setTopic(e.target.value)}
          placeholder="Enter topic..."
        />
        <Pressable
          style={styles.continueButton}
          onPress={() => handleSubmit()}
        >
            <Text>Continue</Text>
        </Pressable>
      </View>
  );
}

export default AddClassDay;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#F1F7EE',
    borderColor: '#3A405A',
    borderRadius: 10,
    color: '#F1F7EE',
    elevation: 3,
    fontFamily: 'arial',
    marginTop: 10,
    paddingVertical: 10,
    width: 315,
  },
  buttonPressed: {
    alignItems: 'center',
    backgroundColor: '#E0EDC5',
    borderColor: '#3A405A',
    borderRadius: 10,
    color: '#E0EDC5',
    elevation: 3,
    fontFamily: 'arial',
    marginTop: 10,
    paddingVertical: 10,
    width: 315,
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(126, 186, 199, .24)',
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
  datePickerStyle: {
    width: 230,
  },
  errorText: {
    color: '#D94A4A',
    fontSize: 12,
    // float: 'left',
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
  },
  subtitleText: {
    color: '#898888',
    fontSize: 20,
    marginBottom: 10,
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
  titleText: {
    color: '#7EBAC7',
    fontFamily: 'arial',
    fontSize: 30,
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
*/
