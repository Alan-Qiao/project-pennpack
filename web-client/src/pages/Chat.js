import { React } from 'react';
import '../styles/Chat.css';
import Contact from '../components/Contact';
import Message from '../components/Message';
import Navbar from '../components/Navbar';

function Chat() {
    const username = 'Amy';
    const handle = 'amyshennn';

  return (

    <div className='Chat-Page'>
        <Navbar />
        <div class="main-content">
            <div class="chats-container">
                <div className="chats-container-title">Chats</div>
                <Contact username={username} handle={handle}></Contact>
            </div>
            <div class="conversation-container">
                <div class="conversation-content">
                <Message id={0}
						 text ={'wow, amazing!'}					
                />
                <Message id={1}
						 text ={'today i woke up and skipped class and ate udon and then went to recitation and then ate some more food at han dynasty then laid in bed for 2 hours'}					
                />    
                <Message id={0}
						 text ={'hello! what is up?'}					
                />
                </div>
                <div className='input-bar'>
                    <label htmlFor = 'upload-picture' className = 'input-picture' />
                    <input id = 'upload-picture'
                        type = 'file' 
                        style={{ display: 'none' }} 
                        accept = 'image/*'>
                    </input>
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
