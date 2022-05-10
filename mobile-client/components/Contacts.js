import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  getChats,
  getMessages,
  // sendMessage,
  // sendFileMessage,
} from './Message';

function Contacts({ navigation }) {
  const [chats, setChats] = useState([]);

  async function fetchUserChats() {
    setChats([]);
    const userChats = await getChats();
    setChats(userChats.userChats);
  }

  async function showChat(chatId, userIdB, username) {
    const messagesRes = await getMessages(chatId);
    navigation.navigate('Chat', {
      chatId,
      userIdB,
      username,
      chatMessages: messagesRes.messages,
    });
  }

  useEffect(() => {
    fetchUserChats();
  }, ([]));

  return (
      <View style={styles.viewStyles}>
          <Text style={styles.titleText}>Your Chats</Text>
          {chats ? chats.map((c, i) => (
            <Pressable
              key={i}
              style={styles.button}
              onPress={() => showChat(c.chatId, c.userIdB, c.username)}
            >
              <Text>
              {c.name}
              {', '}
              {c.username}
              </Text>
            </Pressable>
          )) : null}
      </View>
  );
}

export default Contacts;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(126, 186, 199, .24)',
    borderRadius: 10,
    color: '#92AA83',
    fontFamily: 'arial',
    fontWeight: 'bold',
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
    width: 335,
  },
  titleText: {
    alignItems: 'center',
    color: '#7EBAC7',
    flexWrap: 'wrap',
    fontFamily: 'arial',
    fontSize: 40,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  viewStyles: {
    justifyContent: 'center',
    margin: 20,
    textAlign: 'center',
  },
});
