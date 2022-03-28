import { React, useState } from 'react';
import '../styles/AddClassNote.css';
import { useNavigate } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';

function AddClassNote() {
  const navigate = useNavigate();

  const [lectureClicked, setLectureClicked] = useState(0);
  const [recitationClicked, setRecitationClicked] = useState(0);
  const [seminarClicked, setSeminarClicked] = useState(0);

  const bgColors = {
    lightGreen: '#F1F7EE',
    darkGreen: '#E0EDC5',
  };

  function clickedLecture() {
    console.log('clicked lecture');
    setLectureClicked(1);
    setRecitationClicked(0);
    setSeminarClicked(0);
  }

  function clickedRecitation() {
    console.log('clicked recitation');
    setLectureClicked(0);
    setRecitationClicked(1);
    setSeminarClicked(0);
  }

  function clickedSeminar() {
    console.log('clicked seminar');
    setLectureClicked(0);
    setRecitationClicked(0);
    setSeminarClicked(1);
  }

  return (
    <>
      <BackpackNavbar />
      <div className="ClassNote">
        <h3>Adding a New Class Day...</h3>
        <div className="left-align-classnote">Type</div>
        <button
          className="button_1"
          type="button"
          style={{ backgroundColor: lectureClicked ? bgColors.darkGreen : bgColors.lightGreen }}
          onClick={clickedLecture}
        >
          Lecture
        </button>
        <button
          className="button_1"
          type="button"
          style={{ backgroundColor: recitationClicked ? bgColors.darkGreen : bgColors.lightGreen }}
          onClick={clickedRecitation}
        >
          Recitation
        </button>
        <button
          className="button_1"
          type="button"
          style={{ backgroundColor: seminarClicked ? bgColors.darkGreen : bgColors.lightGreen }}
          onClick={clickedSeminar}
        >
          Seminar
        </button>

        <div className="left-align-classnote">Date</div>
        <input
          type="text"
          className="center-rectangle2 enter"
          placeholder="Enter date..."
        />
        <div className="left-align-classnote">Topic</div>
        <input
          type="text"
          className="center-rectangle2 enter"
          placeholder="Enter the class topic..."
        />
        <button className="button_3" type="button" onClick={() => navigate('/classDashboard')}>
          Continue
        </button>
      </div>

    </>
  );
}

export default AddClassNote;
