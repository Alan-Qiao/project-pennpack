/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../api/services';
import '../styles/Navbar.css';

function BackpackNavbar() {
  const navigate = useNavigate();

  const handleRedirect = async () => {
    const auth = await isAuthenticated();
    if (auth) {
      navigate('/userdashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="Navbar">
      <div
        className="backpack"
        onClick={() => handleRedirect()}
      />
    </div>
  );
}

export default BackpackNavbar;
