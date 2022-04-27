import { React } from 'react';
import '../styles/UserDashboard.css';
import Class from './Class';

function ClassGrid({ classes }) {

  if (classes.length > 0) {
    return (
        <div className="classes-container">
          { classes.map(c => <Class key={c._id} className={c.className} />)}
        </div>
    );
  }

  return (
    <div>
      <h5>Join a Class First</h5>
    </div>
  );
}

export default ClassGrid;
