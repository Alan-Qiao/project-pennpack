import { React, useEffect, useState } from 'react';
import '../styles/ClassDay.css';
import { useParams } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';
import { addNote, readNotes, readClassDay, updateNote } from '../api/services';

function ClassDay() {
  const { id: classDayId } = useParams();

  const [addNoteClicked, setaddNoteClicked] = useState(0);
  const [classDay, setClassDay] = useState({});
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState([]);
  const [incomplete, setIncomplete] = useState(false);

  async function getClassDayData() {
    try {
      const result = await readClassDay(classDayId);
      setClassDay(() => result);
    } catch (e) {
      alert(`An error has occured: ${e.message}`)
    }
  }

  async function getNotes() {
    try {
      const result = await readNotes(classDayId);
      setNotes(() => result);
    } catch (e) {
      alert(`An error has occured: ${e.message}`)
    }
  }

  useEffect(() => {
    getClassDayData();
    getNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function clickedAddNote() {
      setaddNoteClicked(1);
  }

  async function handleSubmit() {
    if (!description || !link) {
      setIncomplete(true);
      return;
    }
    
    try {
      await addNote(classDayId, description, link);
      setaddNoteClicked(0);
      getNotes();
    } catch (e) {
      alert(`An error occured: ${e.message}`);
    }
  }

  async function incLike(noteId, likes) {
    try {
      await updateNote({ noteId, classDayId, likes });
      getNotes();
    } catch (e) {
      alert(`An error occured: ${e.message}`);
    }
  }

    return (
      <>
      <BackpackNavbar />
      <div className="AddClassDay">
          <div className="title">
            {classDay.type}{': '}{classDay.topic}
          </div>
          { addNoteClicked ?
            <div className = 'addNoteContainer'>
              <input type="text"
                className="description-input"
                placeholder="Enter a description.."
                value = {description}
                onChange = {e => setDescription(e.target.value)}> 
              </input>
              <input type="text"
                className="link-input"
                placeholder="Enter a google drive link.."
                value = {link}
                onChange = {e => setLink(e.target.value)}></input>
                <button className="enterButton" onClick = {() => handleSubmit()}>
                    Enter
                </button>
                { !incomplete ? <div className="spacer" /> : <p className="warning">All fields need to be completed</p>}
           </div> 

            :
            <button className = 'button1'
              type = "button"
              onClick = {clickedAddNote}
            >
                + Add Your Notes
            </button>
          }
            { notes.map(note => (
            <div className="note"
              key={note._id}
             >
              {'@'}{note.ownerHandle}
              <br/><br/>
              {note.description}
              <br/>
              {'Link: '}{note.link}
              <div className="justifyRight">
                <button className="likeButtonArea" onClick={() => incLike(note._id, note.likes+1)}>
                  <div className="likeButton" />
                  {note.likes}
                </button>
              </div>
            </div>
        ))}
       
      </div>
    </>
)};

export default ClassDay;