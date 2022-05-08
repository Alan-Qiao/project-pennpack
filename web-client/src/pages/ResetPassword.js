import { React, useState } from 'react';
import '../styles/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';
import { resetPassword } from '../components/user';

function ResetPassword() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const err = await resetPassword(username, password);
    setError(err); // state is only updated after the function finishes updated and react re-renders
    if (!err) {
      alert('Password sucessfully changed.');
      navigate('/login');
    }
  };

  return (
    <>
      <BackpackNavbar />
      <div className="Login">
        <h1>Reset Password</h1>
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
          New Password
        </div>
        <input
          type="password"
          className="center-rectangle enter"
          placeholder="Enter your password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="spacer" />
        <div className="spacer" />
        <div className="spacer" />
        <button className="button" type="button" onClick={() => handleSubmit()}>
          Reset
        </button>
        {error && <div className="spacer" />}
        {error && <p className="warning">{error}</p>}
      </div>
    </>
  );
}

export default ResetPassword;
