import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function BackpackNavbar({ setDisplay }) {
  const navigate = useNavigate();

  return (
    <div className="BackpackNavbar">
      <div
        className="backpackIcon"
        onClick={() => navigate('/')}
      />
    </div>
  );
}

export default BackpackNavbar;
