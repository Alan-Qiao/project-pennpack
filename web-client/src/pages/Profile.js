import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import Navbar from '../components/Navbar';
import ClassGrid from '../components/ClassGrid';
import { disconnectUser } from '../api/services';
import { getClassDataById, getUserClasses } from '../components/Class';

function Profile() {
  const navigate = useNavigate();
  const [userClasses, setUserClasses] = useState([]);
  const user = 'Amy';
  const handle = 'amyshennn';

  const fetchUserClasses = async () => {
    console.log('in fetchUserClasses in UserDashboard');
		const allClasses = await getUserClasses();
    if (allClasses.err) {
      alert(`An error occured: ${allClasses.err}`)
    }
    console.log('allClasses in fetchUserClasses is');
    console.log(allClasses);

    // Need to get each individual class (need id, classname)
    for (let i = 0; i < allClasses.length; i++) {
      const currClass = await getClassDataById(allClasses[i])
      setUserClasses(oldArray => [...oldArray, currClass]);
    }
    
  }

  function logout() {
    disconnectUser();
    navigate('/');
  }

  const clickedChatWithMe = () => {
    // TODO: ADD NEW CHAT
    navigate('/chat');
  }

  useEffect(() => {
		fetchUserClasses()
	}, []);


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
        <ClassGrid classes={userClasses}/>
        <h6>Contributions</h6>
        <div className="notesUploaded">
          Notes uploaded: 4
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
