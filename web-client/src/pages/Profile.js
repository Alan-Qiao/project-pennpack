import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Profile.css';
import Navbar from '../components/Navbar';
import ClassGrid from '../components/ClassGrid';
import { disconnectUser } from '../api/services';
import {
  getClassDataById,
  getUserClassesByUsername
} from '../components/Class';
import {
  getUserInfoByUsername,
  getUserInfo,
} from '../components/User';
import { createChat } from '../components/Message';

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();

  const [user, setUser] = useState('');
  const [userNotesUploaded, setNotesUploaded] = useState(0);
  const [userClasses, setUserClasses] = useState([]);
  

  const fetchUserClasses = async () => {
    setUserClasses([]);
		const allClasses = await getUserClassesByUsername(username);
    if (allClasses.err) {
      alert(`An error occured: ${allClasses.err}`);
    }

    const curClass = []
    for (let i = 0; i < allClasses.length; i++) {
      curClass.push(getClassDataById(allClasses[i]));
    }
    const newClasses = await Promise.all(curClass);
    setUserClasses(() => newClasses);
  }

  const fetchUserInfo = async () => {
    const { name, notesUploaded } = await getUserInfoByUsername(username);
    setUser(name);
    if (notesUploaded) {
      setNotesUploaded(notesUploaded);
    }
  }

  function logout() {
    disconnectUser();
    navigate('/');
  }

  async function clickedChatWithMe() {
    // Check if the user is on their own profile
    const signedInUser = await getUserInfo();
    const signedInUsername = signedInUser.username
    
    // If the user is not on their own profile
    if (username !== signedInUsername) {
      const { _id } = await getUserInfoByUsername(username);

      // Create a new chat if possible
      await createChat(_id);
    }
    navigate('/chat');
  }

  useEffect(() => {
    fetchUserInfo();
		fetchUserClasses()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username]);


  return (
    <>
      <Navbar />
      <div className="Profile">
        <div className="header">
          <h3>{user}{', @'}{username}</h3>
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
        <ClassGrid classes={userClasses}/>
        <h6>Contributions</h6>
        <div className="notesUploaded">
          Notes uploaded: {userNotesUploaded}
        </div>
        <button className="button" 
                style={{marginBottom: 50}}
                type="button" 
                onClick={() => logout()}>
          Logout
        </button>
      </div>
    </>
  );
}
export default Profile;
