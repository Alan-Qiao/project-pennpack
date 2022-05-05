import { React, useEffect, useState } from 'react';
import '../styles/Chat.css';
import Contact from '../components/Contact';
import Message from '../components/Message';
import Navbar from '../components/Navbar';
import {
    getChats,
    sendTextMessage,
    sendImageMessage,
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
        console.log('in sendText');
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
        await sendTextMessage(newMessage);
	}

    const sendImage = async (e) => {
        e.preventDefault();
        const myForm = document.getElementById("my-form");
        console.log("form: ", myForm)
        const formData = new FormData(myForm);
        console.log(formData)
        // console.log(e)
        // console.log(e.target.image.value)
        // console.log('send image called')
        // //const file = e.target.files[0];
        // const file = e.target.image.value;
        // console.log(file);

        // const fileSize = file.size / 1000 / 1000; // change from bytes to MB
        // e.target.value = '';

        // if (fileSize > 10) {
        //     alert('Your media file exceeds the limit of 10MB!');
        // }

        // const newMessage = {
        //     chatId: currChatId,
        //     id: 0,
		// 	type: 'image',
		// 	content: file,
		// 	sender: userId,
        //     userIdB: userIdB
        // }

        // await sendImageMessage(newMessage);
    }

    async function fetchUserChats() {
        console.log('in fetchUserChats in Chat')
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
                    <form>
                        <input id = 'upload-picture'
                            onChange={e => sendImage(e)}
                            type = 'file' 
                            style={{ display: 'none' }} 
                            name="image"/>
                        <input type="submit"/>
                    </form>
                    <label htmlFor = 'upload-video' className = 'input-video' />
                    <input id = 'upload-video'
                        type = 'file' 
                        style={{ display: 'none' }} 
                        accept = 'video/*'>
                    </input>
                    <label htmlFor = 'upload-audio' className = 'input-audio' />
                    <input id = 'upload-audio'
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
