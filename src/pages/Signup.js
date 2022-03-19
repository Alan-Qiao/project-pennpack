import { React, useState } from 'react';
import '../styles/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';
import { signupUser } from '../components/user';

function Signup() {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    setError(signupUser(name, username, password));
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <>
      <BackpackNavbar />
      <div className="Login">
        <h1>Create account</h1>
        <div className="left-align">
          Name
        </div>
        <input
          type="text"
          className="center-rectangle enter"
          placeholder="Enter your name..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="spacer" />
        <div className="left-align">
          Username
        </div>
        <input
          type="text"
          className="center-rectangle enter"
          placeholder="Enter your username..."
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <div className="spacer" />
        <div className="left-align">
          Password
        </div>
        <input
          type="password"
          className="center-rectangle enter"
          placeholder="Enter your password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="spacer" />
        { error && <p>{error}</p> }
        <div className="spacer" />
        <div className="spacer" />
        <button className="button" type="button" onClick={() => handleSubmit()}>
          Continue
        </button>
      </div>
    </>
  );
}

export default Signup;
