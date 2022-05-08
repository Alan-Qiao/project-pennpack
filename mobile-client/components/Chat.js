import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, Image } from 'react-native';
import Message, {
  sendMessage,
  getMessages,
} from './Message';
import {
  getUserInfo,
} from '../helpers/user';

function Chat({ route, navigation }) {
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
  }, ([]));

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
          )) : <></>}
          </ScrollView>
          <View style={styles.bottomBar}>
            <Image
              source={require('../assets/image-square.png')}
              style={{ width: 20, height: 20, margin: 3 }}
            />
            <Image
              source={require('../assets/video-camera.png')}
              style={{ width: 20, height: 20, margin: 3 }}
            >
                {/* <Pressable
                  style={{ display: 'none' }}
                  onPress={() => sendFile()}
                /> */}
            </Image>
            <Image
              source={require('../assets/music-note.png')}
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
              source={require('../assets/send-paper-plane.png')}
              style={{ width: 20, height: 20, margin: 3 }}
            />
            </TouchableOpacity>
          </View>
      </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  viewStyles: {
    justifyContent: 'center',
    flex: 1,
    margin: 20,
    textAlign: 'center',
  },
  chatBox: {
    display: 'flex',
    height: 350,
    flexDirection: 'column-reverse',
  },
  bottomBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },

  titleText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#7EBAC7',
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: 'arial',
    marginBottom: 30,
  },
  button: {
    fontFamily: 'arial',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#92AA83',
    fontWeight: 'bold',
    width: 335,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F7EE',
    marginBottom: 10,
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'arial',
    paddingVertical: 3,
    color: '#9A8F97',
    fontWeight: 'bold',
    padding: 30,
    marginBottom: 20,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(126, 186, 199, .24)',
  },
});
