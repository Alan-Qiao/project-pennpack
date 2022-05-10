import React from 'react';
import '../styles/Contact.css';
import {
    getMessages
} from '../components/Message';


// Id is this contact's id
// setContact set's the current user's contact
const Contact = ({ chatId, userIdB, username, name, setCurrChatId, setUserIdB, setMessages }) => {

    async function showChat() {
        console.log(chatId);
        setCurrChatId(chatId);
        setUserIdB(userIdB);
        const messages = await getMessages(chatId);
        setMessages(messages.messages);
    }


    return (

        <div className = 'Contact' onClick={showChat}>
            <div className = 'spacer'></div>
            {name}{'\t@'}{username}
        </div>
    )
}

export default Contact;