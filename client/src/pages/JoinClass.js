import { React } from 'react';
import { useNavigate } from 'react-router-dom';
//import './CSS/todo.css'
import BackpackNavbar from '../components/BackpackNavbar';


function JoinClass() {
    const navigate = useNavigate();
  
    return (
      <>
        <BackpackNavbar />
        <div className="UserDashboard">
        <div className="left-align">
          <h1>Classes On PennPack</h1>
          </div>

          {/* //how do i add the classes from class.js? */}
          <button
            className="button"
            type="button"
            onClick={() => navigate('/class1')}
          >
            class1.name
          </button>

          <div className="spacer" />
          <button
            className="button"
            type="button"
            onClick={() => navigate('/class2')}
          >
            class2.name
          </button>
        </div>
      </>
  
    
    );
  }
  
  export default JoinClass;