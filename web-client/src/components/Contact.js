import React, { useEffect, useState } from 'react';
import '../styles/Contact.css';


// Id is this contact's id
// setContact set's the current user's contact
const Contact = ({ username, handle }) => {
    // const [profilePicture, setProfilePicture] = useState(imgProfileDefault);
    // const [username, setUserName] = useState('');

    return (

        <div className = 'Contact'>
            <div className = 'spacer'></div>
            {username}{'\t@'}{handle}
        </div>
    )
}

export default Contact;