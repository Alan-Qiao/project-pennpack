import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Video } from 'expo-av';
import {
  createNewChat,
  getUserChats,
  getMessagesByChatId,
  sendNewMessage,
  sendNewFileMessage,
} from '../api/services';

export const sendFileMessage = async message => {
  try {
    const messages = await sendNewFileMessage(message);
    return messages;
  } catch (e) {
    return e.message;
  }
};

export const sendMessage = async message => {
  try {
    const messages = await sendNewMessage(message);
    return messages;
  } catch (e) {
    return e.message;
  }
};

export const getMessages = async chatId => {
  try {
    const messages = await getMessagesByChatId(chatId);
    return messages;
  } catch (e) {
    return e.message;
  }
};

export const getChats = async () => {
  try {
    const chats = await getUserChats();
    return chats;
  } catch (e) {
    return e.message;
  }
};

export const createChat = async id => {
  try {
    const newChat = await createNewChat(id);
    return newChat;
  } catch (e) {
    return e.message;
  }
};

function Message({ id, type, content }) {
  const video = React.useRef(null);

  return (
        <>
            {type === 'text' ? (
              <View style={id === 0 ? styles.MessageRight : styles.MessageLeft}>
                  <Text style={id === 0 ? styles.TextRight : styles.TextLeft}>{content}</Text>
              </View>
            ) : null}
            {type === 'image' ? (
              <View style={id === 0 ? styles.MessageRight : styles.MessageLeft}>
                  <Image
                    style={{ height: 200, width: 200 }}
                    // style={id === 0 ? styles.TextRight : styles.TextLeft}
                    // source={require('../assets/send-paper-plane.png')}
                    source={{ uri: `${content}` }}
                  />
              </View>
            ) : null}
            {type === 'video' ? (
              <View style={id === 0 ? styles.MessageRight : styles.MessageLeft}>
                  <Video
                    style={{ height: 200, width: 200 }}
                    ref={video}
                    source={{ uri: `${content}` }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                  />
              </View>
            ) : null}
            {/* {type === 'audio' ? (
              <View style={id === 0 ? styles.MessageRight : styles.MessageLeft}>
                  <ReactAudioPlayer style={{ height: 100, width: 200 }}
                  src={{ uri: '' + content + '' }}> </ReactAudioPlayer>
              </View>
            ) : null} */}
            {/* {type === 'audio' ? (
              <View style={id === 0 ? styles.MessageRight : styles.MessageLeft}>
                  <Button title="Play me" onPress={() => playTrack()}> </Button>
              </View>
            ) : null} */}

        </>
  );
}
export default Message;

const styles = StyleSheet.create({
  MessageLeft: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(229,229,229)',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 20,
    padding: 10,
  },
  MessageRight: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(146,170,131,0.24)',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 20,
    padding: 10,
  },
  TextLeft: {
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
  },
  TextRight: {
    color: 'black',
    fontSize: 14,
    textAlign: 'right',
  },
});
