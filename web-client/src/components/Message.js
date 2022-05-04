import React from 'react';
import '../styles/Message.css';
import '../styles/Chat.css';
import {
    createNewChat,
    getUserChats
} from '../api/services'

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

const Message = ({ id, text }) => {
    return (
        <>
            {text !== '' ? <div className={id === 0 ? 'Message-right' : 'Message-left'}>
                <div className={id === 0 ? 'text-right' : 'text-left'}>{text}</div>
            </div> : <></>}
        </>
    );
}
export default Message;