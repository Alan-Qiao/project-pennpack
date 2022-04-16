import { React, useState } from 'react';
import '../styles/LoginSignup.css';
//import '../styles/JoinClassCreateClass.css';
import { useNavigate } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';
import { classAdd } from '../components/class';

function CreateClass() {
  const [error, setError] = useState('');
  const [course, setCourseID] = useState('');
  const [prof, setProf] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    const err = classAdd(course, prof);
    setError(err);

    if (!err) {
      navigate('/classDashboard');
    }
  };

  return (
    <>
      <BackpackNavbar />
      <div className="UserDashboard">
        <div className="left-align">
        <h1>Add a New Class!</h1>
        </div>
        
        <div className="left-align">
          Course ID (i.e. CIS 350)
        </div>

        <input
          type="text"
          className="center-rectangle enter"
          placeholder="Enter course code..."
          value={course}
          onChange={e => setCourseID(e.target.value)}
        />


        <div className="spacer" />
        <div className="left-align">
          Professor
        </div>
        <input
          type="text"
          className="center-rectangle enter"
          placeholder="Enter Professor..."
          value={username}
          onChange={e => setProf(e.target.value)}
        />
       
        <div className="spacer" />
        <div className="spacer" />
        <div className="spacer" />
        <button className="button" type="button" onClick={() => handleSubmit()}>
          Continue
        </button>
        { error && <div className="spacer" />}
        { error && <p className="warning">{error}</p> }
      </div>

    </>
  );
}

export default CreateClass;