import { React } from 'react';
import '../styles/Chat.css';
import Contact from '../components/Contact'
import BackpackEnvelopeNavbar from '../components/BackpackEnvelopeNavbar';

function Chat() {
    const username = 'Amy';

  return (

    // <div className="ChatPage">
    //     {/* <BackpackEnvelopeNavbar /> */}
    //         <div className="chats-container">
    //             <div className="chats-container-title">Chats</div>
    //             <div className="chats">
    //                 <Contact username={username}></Contact>
    //             </div>
    //         </div>
    //         <div className="conversation-container">
    //             <div className="conversation-content">
    //                 hey
    //             </div>
    //         </div>
    // </div>

    <div className='Chat-Page'>
        <BackpackEnvelopeNavbar />
        <div class="main-content">
            <div class="chats-container">
                <div className="chats-container-title">Chats</div>
                <Contact username={username}></Contact>
            </div>
            
            <div class="conversation-container">
                Flex Column 2
            </div>
  
        </div>
    </div>
    
  );
}

export default Chat;
