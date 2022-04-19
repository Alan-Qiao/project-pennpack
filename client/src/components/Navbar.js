import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(false);

  const submitSearch = () => {
    // TODO: Check if searchInput was found in database, if not, setError(true)
    console.log(searchInput);
  };

  const clickedBackpack = () => {
    navigate('/userdashboard');
  };

  const clickedEnvelope = () => {
    navigate('/chat');
  };

  const clickedProfile = () => {
    console.log('NAVIGATE TO PROFILE PAGE');
  };


  return (
    <div className="Navbar">
      <div className="logos">
        <div
          className="backpack"
          onClick={clickedBackpack}
        />
        <div
          className="envelope"
          onClick={clickedEnvelope}
        />
      </div>
      <input
        className={error ? 'search-bar-error' : 'search-bar'}
        type="text"
        placeholder="Search PennPack"
        onChange={e => setSearchInput(e.target.value)}
        onKeyPress={e => { if (e.key === 'Enter' && searchInput) submitSearch(); }}
      />
      <div
        className="profile"
        onClick={clickedProfile}
      />
      <div className="buttonStack">
        <button type="button" className="textButton" onClick={() => navigate('/JoinClass')}>Join A Class</button>
        <button type="button" className="textButton" onClick={() => navigate('/createclass')}>Create a Class</button>
      </div>
    </div>
  );
}

export default Navbar;
