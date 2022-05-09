import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
// import { getClassData, dayTitle } from './Class';

function ClassDay({ route, navigation }) {
  const { className } = route.params;
  const [noteName, setNoteName] = useState('');
  const [addNoteClicked, setAddNoteClicked] = useState(false);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [incomplete, setIncomplete] = useState(false);

  function clickedAddNote() {
    setAddNoteClicked(true);
    console.log('CLICKED IT');
  }

  function continueClicked() {
    setAddNoteClicked(false);

    if (!description || !link) {
      setIncomplete(true);
    }
  }

  async function fetchClassNotes() {
    // TODO: BACKEND INTEGRATION, GET DAY INFO
    setNoteName('Lecture: React Applications');
  }

  useEffect(() => {
    fetchClassNotes();
  }, []);

  return (
      <View style={styles.viewStyles}>
        <Text style={styles.titleText}>{noteName}</Text>
        {
          addNoteClicked
            ? <View>
              <Text style={styles.subtitleText}>
                Description
              </Text>
              <TextInput
                style={styles.textInput}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter your description"
              />
              <Text style={styles.subtitleText}>
                Google Drive link
              </Text>
              <TextInput
                style={styles.textInput}
                onChange={e => setLink(e.target.value)}
                placeholder="Enter your Google Drive link"
              />
              <Pressable
                style={styles.continueButton}
                onPress={() => continueClicked()}
              >
              <Text>
                Continue
              </Text>
              </Pressable>
              </View>
            : <Pressable
                onPress={() => clickedAddNote()}
                style={styles.button}
            >
                <Text>
                  + Add your notes
                </Text>
              </Pressable>
        }
      </View>
  );
}

export default ClassDay;

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
