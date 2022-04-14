/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/currentUserSlice';
import '../styles/Navbar.css';

function BackpackNavbar() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleRedirect = () => {
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
        onClick={handleRedirect}
      />
    </div>
  );
}

export default BackpackNavbar;
