import { React } from 'react';
import '../styles/Chat.css';
import Contact from '../components/Contact'
import Message from '../components/Message'
import BackpackEnvelopeNavbar from '../components/BackpackEnvelopeNavbar';

function Chat() {
    const username = 'Amy';
    const handle = 'amyshennn'

  return (

    <div className='Chat-Page'>
        <BackpackEnvelopeNavbar />
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
                        <input className="input-message" 
                                id = "input-message" 
                                type="text" 
                                placeholder="Type something"
                        >
						</input>
                        <div className="input-send"></div>
                    </div>
                    
            </div>
  
        </div>
    </div>
    
  );
}

export default Chat;
