import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet, TextInput } from 'react-native';
import { addNote, readNotes, readClassDay } from '../api/services';

function ClassDay({ route, navigation }) {
  const { id, className } = route.params;
  const [classDay, setClassDay] = useState({});
  const [notes, setNotes] = useState([]);
  const [addNoteClicked, setAddNoteClicked] = useState(false);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [incomplete, setIncomplete] = useState(false);

  function clickedAddNote() {
    setAddNoteClicked(true);
    console.log('CLICKED IT');
  }

  async function handleSubmit() {
    if (!description || !link) {
      setIncomplete(true);
      return;
    }

    try {
      await addNote(id, description, link);
      setAddNoteClicked(false);
      getNotes();
    } catch (e) {
      alert(`An error occured: ${e.message}`);
    }
  }

  async function getClassDayData() {
    try {
      const result = await readClassDay(id);
      setClassDay(result);
    } catch (e) {
      alert(`An error has occured: ${e.message}`);
    }
  }

  async function getNotes() {
    try {
      const result = await readNotes(id);
      console.log(result);
      setNotes(result);
    } catch (e) {
      alert(`An error has occured: ${e.message}`);
    }
  }

  useEffect(() => {
    getClassDayData();
    getNotes();
  }, []);

  // Fetches from the database every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await readNotes(id);
      setNotes(result);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
      <View style={styles.viewStyles}>
        <Text style={styles.titleText}>
        {classDay.type}
        {': '}
        {classDay.topic}
        </Text>
        {
          addNoteClicked
            ? (
            <View>
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
                onPress={() => handleSubmit()}
              >
              <Text>
                Continue
              </Text>
              { !incomplete
                ? null
                : (
                  <Text style={styles.warning}>
                    All fields need to be completed
                  </Text>
                )}
              </Pressable>
            </View>
            )
            : (
          <Pressable
            onPress={() => clickedAddNote()}
            style={styles.button}
          >
                <Text>
                  + Add your notes
                </Text>
          </Pressable>
            )
        }
        { notes.map((note, i) => (
          <View
            style={styles.note}
            id={i}
          >
            <Text id={i}>
              @
              {note.ownerHandle}
              {'\n'}
              {'\n'}
              {note.description}
              {'\n'}
              {'Link: '}
              {note.link}
            </Text>
          </View>
        ))}
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
    marginBottom: 10,
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
    marginBottom: 20,
    marginTop: 20,
    paddingVertical: 10,
    width: 315,
  },
  note: {
    backgroundColor: 'rgba(126, 186, 199, .24)',
    borderColor: '#3A405A',
    borderRadius: 10,
    fontFamily: 'arial',
    marginBottom: 10,
    padding: 10,
    width: 315,
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
  warning: {
    color: '#E95C5C',
    fontSize: 10,
  },
});
