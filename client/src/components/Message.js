import React from 'react';
import '../styles/Message.css';
import '../styles/Chat.css';

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