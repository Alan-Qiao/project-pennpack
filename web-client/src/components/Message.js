import React from 'react';
import '../styles/Message.css';
import '../styles/Chat.css';
import {
    createNewChat,
    getUserChats,
    getMessagesByChatId,
    sendNewMessage,
    sendNewFileMessage,
} from '../api/services'

export const sendFileMessage = async (message) => {
    try {
        console.log(message);
        const messages = await sendNewFileMessage(message);
        return messages;
    } catch (e) {
        return e.message;
    }
}

export const sendMessage = async (message) => {
    try {
        const messages = await sendNewMessage(message);
        return messages;
    } catch (e) {
        return e.message;
    }
}

export const getMessages = async (chatId) => {
    try {
        const messages = await getMessagesByChatId(chatId);
        return messages;
    } catch (e) {
        return e.message;
    }
}

export const getChats = async () => {
    try {
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
            {type === 'image' ? <div className={id === 0 ? 'Image-right' : 'Image-left'}>
                <img src = {content} alt = 'successfully sent' />
            </div> : <></>}
            {type === 'video' ? <div className = {id === 0 ? 'Video-right' : 'Video-left'}>
                <video width = "300" height = "300" controls >
                    <source src = {content} type = "video/mp4" />
                </video>
            </div> : <></>}
            {type === 'audio' ? <div className = {id === 0 ? 'Audio-right' : 'Audio-left'}>
                <audio width = "200" src = {content} controls></audio>
            </div> : <></>}
        </>
    );
}
export default Message;