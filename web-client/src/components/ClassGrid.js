import { React } from 'react';
import '../styles/UserDashboard.css';
import Class from './Class';

function ClassGrid({ classes, mode }) {

  if (classes.length > 0) {
    return (
        <div className="classes-container">
          { classes.map(c => <Class key={c._id} classId={c._id} className={c.className} mode={mode} />)}
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
