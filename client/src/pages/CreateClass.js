import { React, useState } from 'react';
import '../styles/CreateClass.css';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import { classAdd } from '../components/Class';

function CreateClass() {
  const [course, setCourse] = useState('');
  const [prof, setProf] = useState('');
  const [incomplete, setIncomplete] = useState(false);

  // const navigate = useNavigate();

  function handleSubmit() {
    if (!course || !prof) {
      setIncomplete(true);
    }
  }

  return (
    <>
      <Navbar />
      <div className="CreateClass">
        <h3>Add a new class!</h3>
        <div className="left-align-course">Course</div>
        <input
          type="text"
          className="center-rectangle2 enter"
          placeholder="Enter the course (i.e. CIS 350) ..."
          onChange={e => setCourse(e.target.value)}
        />
        <div className="left-align-course">Topic</div>
        <input
          type="text"
          className="center-rectangle2 enter"
          placeholder="Enter the class topic..."
          onChange={e => setProf(e.target.value)}
        />
        { incomplete && <div className="spacer" />}
        { !incomplete ? <div className="spacer" /> : <p className="warning">All fields need to be completed</p>}
        <div className="spacer" />
        <button className="button_3" type="button" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </>
  );
}
export default CreateClass;
