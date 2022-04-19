import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';
import BackpackNavbar from '../components/BackpackNavbar';
// import Navbar from '../components/Navbar';

function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <BackpackNavbar />
      <div className="Homepage">
        <h1>PennPack</h1>
        <button
          className="button"
          type="button"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <div className="spacer" />
        <button
          className="button"
          type="button"
          onClick={() => navigate('/signup')}
        >
          New user
        </button>
      </div>
    </>
  );
}

export default Homepage;
