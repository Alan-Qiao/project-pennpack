/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/currentUserSlice';
import '../styles/Navbar.css';

function BackpackEnvelopeNavbar() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleBackpackRedirect = () => {
    if (user.name) {
      navigate('/userdashboard');
    } else {
      navigate('./');
    }
  };

  return (
    <div className="BackpackNavbar">
      <div
        className="backpackIcon"
        onClick={handleBackpackRedirect()}
      />
      <div
        className="envelopeIcon"
        onClick={() => navigate('/chat')}
      />
      <div className="buttonStack">
        <button type="button" className="textButton" onClick={() => navigate('/joinclass')}>Join A Class</button>
        <button type="button" className="textButton" onClick={() => navigate('/newclass')}>Create a Class</button>
      </div>
    </div>
  );
}

export default BackpackEnvelopeNavbar;
