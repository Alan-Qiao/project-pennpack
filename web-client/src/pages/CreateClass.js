import { React, useState } from 'react';
import '../styles/CreateClass.css';
import Navbar from '../components/Navbar';
import { createNewClass, joinNewClass } from '../components/classes';

function CreateClass() {
  const [course, setCourse] = useState('');
  const [prof, setProf] = useState('');
  const [incomplete, setIncomplete] = useState(false);
  const [error, setError] = useState('');


  async function handleSubmit() {
    if (!course || !prof) {
      setIncomplete(true);
      return;
    }

    let res = await createNewClass(course, prof);

    // The newly created class's id in the db
    const newlyCreatedClassId = res.newlyCreatedClass;

    // Add the class to the user's list of classes
    await joinNewClass(newlyCreatedClassId);

    // TODO: navigate to the class's page
    
  }

  return (
    <>
      <Navbar />
      <div className="CreateClass">
        <div className="add-class-title">
          Add a new class!
        </div>
        <div className="left-align-course">Course</div>
        <input
          type="text"
          className="center-rectangle2 enter"
          placeholder="Enter the course (i.e. CIS 350) ..."
          onChange={e => setCourse(e.target.value)}
        />
        <div className="left-align-course">Professor</div>
        <input
          type="text"
          className="center-rectangle2 enter"
          placeholder="Enter the professor's name ..."
          onChange={e => setProf(e.target.value)}
        />
        <div className="spacer" />
        <div className="spacer" />
        <button className="button_3" type="button" onClick={handleSubmit}>
          Continue
        </button>
        { incomplete && <div className="spacer" />}
        { !incomplete ? <div className="spacer" /> : <p className="warning">All fields need to be completed</p>}
        { error ? <div className="spacer" /> : <p className="warning">{error}</p>}
      </div>
    </>
  );
}
export default CreateClass;
