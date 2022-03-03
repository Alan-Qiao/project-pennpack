import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const BackpackNavbar = ({ setDisplay }) => {

    const navigate = useNavigate();

    return (
        <div className="BackpackNavbar">
            <div className="backpackIcon"
                onClick={_ => navigate('/')}/>
        </div>
    )

}

export default BackpackNavbar;