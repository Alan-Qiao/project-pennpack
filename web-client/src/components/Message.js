import React from 'react';
import '../styles/Message.css';
import '../styles/Chat.css';
import {
    createNewChat,
    getUserChats,
    getMessagesByChatId,
    sendNewMessage,
} from '../api/services'

export const sendMessage = async (message) => {
    try {
        console.log('in sendMessage in Message')
        const messages = await sendNewMessage(message);
        return messages;
    } catch (e) {
        return e.message;
    }
}

export const getMessages = async (chatId) => {
    try {
        console.log('in getMessages in Message')
        const messages = await getMessagesByChatId(chatId);
        return messages;
    } catch (e) {
        return e.message;
    }
}

export const getChats = async () => {
    try {
        console.log('in getChats in Message')
        const chats = await getUserChats();
        return chats;
      } catch (e) {
        return e.message;
      }
}

export const createChat = async (id) => {
    try {
        const newChat = await createNewChat(id);
        return newChat;
      } catch (e) {
        return e.message;
      }
}

const Message = ({ id, type, content }) => {
    return (
        <>
            {type === 'text' ? <div className={id === 0 ? 'Message-right' : 'Message-left'}>
                <div className={id === 0 ? 'text-right' : 'text-left'}>{content}</div>
            </div> : <></>}
        </>
    );
}
export default Message;