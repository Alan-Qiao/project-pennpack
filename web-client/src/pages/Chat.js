import { React, useEffect, useState } from 'react';
import { serverPath } from '../consts';
import '../styles/Chat.css';
import Contact from '../components/Contact';
import Message from '../components/Message';
import Navbar from '../components/Navbar';
import {
    getChats,
    getMessages,
    sendMessage,
    sendFileMessage,
} from '../components/Message';
import {
    getUserInfo,
} from '../components/user';

function Chat() {
    const [chats, setChats] = useState([]);
    const [currChatId, setCurrChatId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [userIdB, setUserIdB] = useState(0);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    

    const handleKeypressSendMessage = (e) => {
		const input = document.getElementById('input-message');
		if (e.key === 'Enter' && input.value != '') {
			sendText();
		}
	}

    const sendText = async () => {		
		setInputMessage('');
		const input = document.getElementById('input-message');
		input.value = '';

		const newMessage = {
            chatId: currChatId,
            id: 0,
			type: 'text',
			content: inputMessage,
			sender: userId,
            userIdB: userIdB
		};

		setMessages([...messages, newMessage]);
        await sendMessage(newMessage);
	}

    const sendFile = async (e, fileType) => {
        const file = e.target.files[0];
        const fileSize = file.size / 1000 / 1000; // change from bytes to MB
        e.target.value = '';

        if (fileSize > 10) {
            alert('Your media file exceeds the limit of 10MB!');
        }

        const newMessage = {
            chatId: currChatId,
            id: 0,
			type: fileType,
			content: file,
			sender: userId,
            userIdB: userIdB
        }

        const { newlyCreatedMessage } = await sendFileMessage(newMessage);
        newMessage.content = newlyCreatedMessage.content;

        console.log(newMessage);
        setMessages([...messages, newMessage]);
    }

    async function fetchUserChats() {
        setChats([]);
		const userChats = await getChats();
        setChats(userChats.userChats)
	}

    async function fetchUserId() {
		const user = await getUserInfo();
        setUserId(user._id);
	}

    useEffect(() => {
        fetchUserId();
		fetchUserChats();
	}, ([]));

    // Fetches from the database every 5 seconds 
	useEffect(() => {
		const interval = setInterval(async () => {
			const messages = await getMessages(currChatId);
            setMessages(messages.messages);
		}, 5000);
		return () => clearInterval(interval);
	})

  return (

    <div className='Chat-Page'>
        <Navbar />
        <div className="main-content">
            <div className="chats-container">
                <div className="chats-container-title">Chats</div>
                    {chats ? chats.map((c, index) => (
                        <Contact key = {index}
                            chatId = {c.chatId}
                            userIdB = {c.userIdB}
                            username = {c.username}
                            name = {c.name}
                            setMessages = {setMessages}
                            setCurrChatId = {setCurrChatId}
                            setUserIdB = {setUserIdB}
                        /> )) : <></>
                    }
            </div>
            <div className="conversation-container">
                <div className="conversation-content">
                {messages ? messages.map((message, index) => (
                        <Message key = {index}
                            id = {message.id}
                            type = {message.type}
                            content = {message.content}
                            />)).reverse() : <></>}
                </div>
                <div className='input-bar'>
                    <label htmlFor = 'upload-picture' className = 'input-picture' />
                    <form className='upload-picture'>
                        <input id = 'upload-picture'
                            onChange={e => sendFile(e, 'image')}
                            type = 'file' 
                            style={{ display: 'none' }} 
                            accept = 'image/*'/>
                    </form>
                    <label htmlFor = 'upload-video' className = 'input-video' />
                    <input id = 'upload-video'
                        onChange={e => sendFile(e, 'video')}
                        type = 'file' 
                        style={{ display: 'none' }} 
                        accept = 'video/*'>
                    </input>
                    <label htmlFor = 'upload-audio' className = 'input-audio' />
                    <input id = 'upload-audio'
                        onChange={e => sendFile(e, 'audio')}
                        type = 'file'
                        style={{ display: 'none' }}
                        accept = 'audio/*'>
                    </input>
                    <input className="input-message" 
                            id = "input-message" 
                            type="text" 
                            placeholder="Type something"
                            onChange={e => setInputMessage(e.target.value)}
							onKeyDown={handleKeypressSendMessage}
                    >
                    </input>
                    <div className="input-send"/>
                    </div>
                    
            </div>
  
        </div>
    </div>
    
  );
}

export default Chat;
