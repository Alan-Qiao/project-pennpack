import { React, useState } from 'react';
import '../styles/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';
import { loginUser } from '../components/User';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const err = await loginUser(username, password);
    setError(err); // state is only updated after the function finishes updated and react re-renders
    if (!err) {
      navigate('/userdashboard');
    }
  };

  return (
    <>
      <BackpackNavbar />
      <div className="Login">
        <h1>Log in</h1>
        <div className="left-align-login">
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
        <div className="left-align-login">
          Password
        </div>
        <input
          type="password"
          className="center-rectangle enter"
          placeholder="Enter your password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="reset-button" type="button" onClick={() => navigate('/resetPassword')}>Reset Password</button>
        <div className="spacer" />
        <div className="spacer" />
        <div className="spacer" />
        <button className="button" type="button" onClick={() => handleSubmit()}>
          Continue
        </button>
        {error && <div className="spacer" />}
        {error && <p className="warning">{error}</p>}
      </div>
    </>
  );
}

export default Login;
