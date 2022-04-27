import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import Navbar from '../components/Navbar';
import ClassGrid from '../components/ClassGrid';

function Profile() {
  const navigate = useNavigate();
  const user = 'Amy';
  const handle = 'amyshennn';
  const [course, setCourse] = useState('');
  const [prof, setProf] = useState('');
  const [incomplete, setIncomplete] = useState(false);

  // const navigate = useNavigate();

  function handleSubmit() {
    if (!course || !prof) {
      setIncomplete(true);
    }
  }

  const clickedChatWithMe = () => {
    // TODO: ADD NEW CHAT
    navigate('/chat');
  }

  return (
    <>
      <Navbar />
      <div className="Profile">
        <div className="header">
          <h3>{user}{'@'}{handle}</h3>
          <div
            className="chatButton"
            onClick={clickedChatWithMe}
          >
            <div className="envelope" />
            <div className="chatWithMe">
              Chat with me!
            </div>
          </div>
        </div>
        <h5>Analytics</h5>
        <h6>Enrolled classes</h6>
        {/* ENROLLED CLASSES HERE*/}
        <h6>Contributions</h6>
        <div className="notesUploaded">
          Notes uploaded: 4
        </div>
      </div>
    </>
  );
}
export default Profile;
