import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, Image, Dimensions } from 'react-native';
import Message, {
  sendMessage,
  getMessages,
} from './Message';
import {
  getUserInfo,
} from '../helpers/user';

const imageSquare = require('../assets/image-square.png');
const videoCam = require('../assets/video-camera.png');
const musicNote = require('../assets/music-note.png');
const sendPlane = require('../assets/send-paper-plane.png');

const windowHeight = Dimensions.get('window').height;
console.log(windowHeight);

function Chat({ route }) {
  const { chatId, userIdB, username, chatMessages } = route.params;
  const [messages, setMessages] = useState([chatMessages]);
  const [userId, setUserId] = useState(0);
  const [inputMessage, setInputMessage] = useState('');

  const sendText = async () => {
    const newMessage = {
      chatId,
      id: 0,
      type: 'text',
      content: inputMessage,
      sender: userId,
      userIdB,
    };

    setMessages([...messages, newMessage]);
    await sendMessage(newMessage);
  };

  async function fetchUserId() {
    const user = await getUserInfo();
    setUserId(user._id);
  }

  useEffect(() => {
    fetchUserId();
  }, []);

  // Fetches from the database every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const messagesFetched = await getMessages(chatId);
      setMessages(messagesFetched.messages);
    }, 3000);
    return () => clearInterval(interval);
  });z

  return (
      <View style={styles.viewStyles}>
          <Text style={styles.titleText}>{username}</Text>
          <ScrollView style={styles.chatBox}>
          {messages ? messages.map((message, i) => (
                        <Message
                          key={i}
                          id={message.id}
                          type={message.type}
                          content={message.content}
                        />
          )) : null}
          </ScrollView>
          <View style={styles.bottomBar}>
            <Image
              source={imageSquare}
              style={{ width: 20, height: 20, margin: 3 }}
            />
            <Image
              source={videoCam}
              style={{ width: 20, height: 20, margin: 3 }}
            >
                {/* <Pressable
                  style={{ display: 'none' }}
                  onPress={() => sendFile()}
                /> */}
            </Image>
            <Image
              source={musicNote}
              style={{ width: 20, height: 20, margin: 3 }}
            />
            <TextInput
              style={styles.textInput}
              onChange={e => setInputMessage(e.target.value)}
            />
            <TouchableOpacity
              onPress={() => sendText()}
            >
            <Image
              source={sendPlane}
              style={{ width: 20, height: 20, margin: 3 }}
            />
            </TouchableOpacity>
          </View>
      </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  bottomBar: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  chatBox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column-reverse',
    minHeight: (windowHeight * 0.72),
  },

  textInput: {
    alignItems: 'center',
    backgroundColor: 'rgba(126, 186, 199, .24)',
    borderRadius: 10,
    color: '#9A8F97',
    elevation: 3,
    fontFamily: 'arial',
    fontWeight: 'bold',
    height: (windowHeight * 0.03),
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 3,
    padding: 30,
  },
  titleText: {
    alignItems: 'center',
    color: '#7EBAC7',
    flexWrap: 'wrap',
    fontFamily: 'arial',
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'left',
  },
  viewStyles: {
    height: '100%',
    justifyContent: 'between',
    margin: 20,
    overflow: 'visible',
    textAlign: 'center',
  },
});

/*

  button: {
    alignItems: 'center',
    backgroundColor: '#F1F7EE',
    borderRadius: 20,
    color: '#92AA83',
    fontFamily: 'arial',
    fontWeight: 'bold',
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
    width: 335,
  },

*/
