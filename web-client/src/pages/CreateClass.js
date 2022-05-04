import { React, useState } from 'react';
import '../styles/CreateClass.css';
import Navbar from '../components/Navbar';
import { createNewClass, joinNewClass } from '../components/Class';
import { useNavigate } from 'react-router-dom';

function CreateClass() {
  const [course, setCourse] = useState('');
  const [prof, setProf] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()


  async function handleSubmit() {
    if (!course || !prof) {
      setError('All fields need to be completed');
      return;
    }

    console.log(course)
    const res = await createNewClass(course.replaceAll(/\s/,''), prof);

    if (res.err) {
      alert(`Could not create class`);
    }

    // The newly created class's id in the db
    const newlyCreatedClassId = res.newlyCreatedClass;

    // Add the class to the user's list of classes
    const resp = await joinNewClass(newlyCreatedClassId);
    if (resp.err) {
      alert(`Could not join the class created`);
    }

    // TODO: navigate to the class's page
    navigate(`/classdashboard/${newlyCreatedClassId}`)
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
        { error && <div className="spacer" />}
        { error ? <div className="spacer" /> : <p className="warning">{error}</p>}
      </div>
    </>
  );
}
export default CreateClass;
