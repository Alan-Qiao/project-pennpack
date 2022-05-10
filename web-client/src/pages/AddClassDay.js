import { React, useState } from 'react';
import '../styles/AddClassDay.css';
import { useNavigate, useParams } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';
import { addClassDay } from '../api/services';

function AddClassDay() {
  const navigate = useNavigate();

  const { name: className } = useParams();

  const [type, setType] = useState('');
  const [date, setDate] = useState(new Date(Date.now()).toISOString().substring(0, 10));
  const [topic, setTopic] = useState('');
  const [incomplete, setIncomplete] = useState(false);

  async function handleSubmit() {
    if (!type || !topic) {
      setIncomplete(true);
      return;
    }

    await addClassDay(className, date, type, topic);
    navigate(`/classDashboard/${className}`);
  }

  const [lectureClicked, setLectureClicked] = useState(0);
  const [recitationClicked, setRecitationClicked] = useState(0);
  const [seminarClicked, setSeminarClicked] = useState(0);

  function clickedLecture() {
    setLectureClicked(1);
    setRecitationClicked(0);
    setSeminarClicked(0);
    setType('Lecture');
  }

  function clickedRecitation() {
    setLectureClicked(0);
    setRecitationClicked(1);
    setSeminarClicked(0);
    setType('Recitation');
  }

  function clickedSeminar() {
    setLectureClicked(0);
    setRecitationClicked(0);
    setSeminarClicked(1);
    setType('Seminar');
  }

  return (
    <>
      <BackpackNavbar />
      <div className="ClassNote">
        <h3>Adding a New Class Day...</h3>
        <div className="left-align-classnote">Type</div>
        <button
          className={lectureClicked ? 'button_1_checked' : 'button_1'}
          type="button"
          onClick={clickedLecture}
        >
          Lecture
        </button>
        <button
          className={recitationClicked ? 'button_1_checked' : 'button_1'}
          type="button"
          onClick={clickedRecitation}
        >
          Recitation
        </button>
        <button
          className={seminarClicked ? 'button_1_checked' : 'button_1'}
          type="button"
          onClick={clickedSeminar}
        >
          Seminar
        </button>

        <div className="left-align-classnote">Date</div>
        <input
          type="date"
          className="center-rectangle2 enter"
          onChange={e => setDate(e.target.value)}
          value={date}
        />
        <div className="left-align-classnote">Topic</div>
        <input
          type="text"
          className="center-rectangle2 enter"
          placeholder="Enter the class topic..."
          onChange={e => setTopic(e.target.value)}
          value={topic}
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

export default AddClassDay;