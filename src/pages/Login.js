import { React, useState } from 'react';
import '../styles/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';
import { loginUser } from '../components/user';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    setError(loginUser(username, password));
    if (!error) {
      navigate('/');
    }
  };

  return (
    <>
      <BackpackNavbar />
      <div className="Login">
        <h1>Log in</h1>
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
          type="text"
          className="center-rectangle enter"
          placeholder="Enter your password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="spacer" />
        {error && <p>{error}</p>}
        <div className="spacer" />
        <div className="spacer" />
        <button className="button" type="button" onClick={() => handleSubmit()}>
          Continue
        </button>
      </div>
    </>
  );
}

export default Login;
