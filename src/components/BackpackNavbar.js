/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

// this was passed as an argument { setDisplay }
function BackpackNavbar() {
  const navigate = useNavigate();

  return (
    <div className="BackpackNavbar">
      <div
        className="backpackIcon"
        onClick={() => navigate('/')}
      />
      <div className="buttonStack">
        <button type="button" className="textButton" onClick={() => navigate('/joinclass')}>Join A Class</button>
        <button type="button" className="textButton" onClick={() => navigate('/newclass')}>Create a Class</button>
      </div>
    </div>
  );
}

export default BackpackNavbar;
