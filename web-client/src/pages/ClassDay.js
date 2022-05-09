import { React, useEffect, useState } from 'react';
import '../styles/AddClassDay.css';
import { useNavigate, useParams } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';
import { addNote, readNotes } from '../api/services';

function ClassDay() {
  const navigate = useNavigate();
  const { id: classDayId } = useParams();

  const [addNoteClicked, setaddNoteClicked] = useState(0);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState([]);

  async function getNotes() {
    try {
      const result = await readNotes(classDayId);
      setNotes(result);
    } catch (e) {
      alert(`An error has occured: ${e.message}`)
    }
  }

  useEffect(() => {
    getNotes();
  }, [])

  function clickedAddNote() {
      setaddNoteClicked(1);
      console.log("CLICKED IT")
  }

  const [incomplete, setIncomplete] = useState(false);

  async function handleSubmit() {
    if (!description || !link) {
      setIncomplete(true);
      return;
    }
    console.log('this ran');
    try {
      await addNote(classDayId, description, link);
      setaddNoteClicked(0);
      getNotes();
    } catch (e) {
      alert(`An error occured: ${e.message}`)
    }
  }

  if (!addNoteClicked) {
    return (
      <>
      <BackpackNavbar />
      <div className="AddClassDay">
          <h5 className = "title"> cis350</h5>
            <button className = 'button1'
              type = "button"
              onClick = {clickedAddNote}
            >
                + Add Class Day
            </button>

        <button className = 'button2'> Anisha</button>
       
      </div>
    </>
    )
  }

  return (
    <>
      <BackpackNavbar />
      <div className="AddClassDay">
        <h5 className = "title"> cis350</h5>
        <div className = 'container-1'>
          <h6 className='subtitle1'>Description:</h6>
            <input type="text"
              className="description-input"
              placeholder="Enter a description.."
              value = {description}
              onChange = {e => setDescription(e.target.value)}> 
            </input>
            <h6 className='subtitle1'>Google Drive Link:</h6>
            <input type="text"
              className="link-input"
              placeholder="Enter a google drive link.."
              value = {link}
              onChange = {e => setLink(e.target.value)}></input>
              <button className="button6" onClick = {() => handleSubmit()}>
                  Enter
              </button>
              { !incomplete ? <div className="spacer" /> : <p className="warning">All fields need to be completed</p>}
        </div> 
        
        <button className = 'button2'> Anisha</button>
       
      </div>
    </>
  );
}

export default ClassDay;