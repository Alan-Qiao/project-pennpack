import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  getUserInfo,
} from '../helpers/user';
import {
  getChats,
  getMessages,
  // sendMessage,
  // sendFileMessage,
} from './Message';

function Contacts({ navigation }) {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState(0);

  async function fetchUserChats() {
    setChats([]);
    const userChats = await getChats();
    console.log(userChats);
    setChats(userChats.userChats);
  }

  async function fetchUserId() {
    const user = await getUserInfo();
    setUserId(user._id);
  }

  async function showChat(chatId, userIdB, username) {
    const messagesRes = await getMessages(chatId);
    navigation.navigate('Chat', {
      chatId,
      userIdB,
      username,
      chatMessages: messagesRes.messages,
      navigation,
    });
  }

  useEffect(() => {
    fetchUserId();
    fetchUserChats();
  }, ([]));

  return (
      <View style={styles.viewStyles}>
          <Text style={styles.titleText}>Your Chats</Text>
          {chats ? chats.map((c,i) => (
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
          )) : <></>}
      </View>
  );
}

export default Contacts;

const styles = StyleSheet.create({
  viewStyles: {
    justifyContent: 'center',
    margin: 20,
    textAlign: 'center',
  },
  titleText: {
    marginTop: 30,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
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
    borderRadius: 10,
    backgroundColor: 'rgba(126, 186, 199, .24)',
    marginBottom: 10,
  },
});
