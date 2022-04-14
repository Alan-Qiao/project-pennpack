import { React } from 'react';
import { useSelector } from 'react-redux';
import '../styles/UserDashboard.css';
import Class from './Class';
import { selectClassList } from '../redux/classListSlice';

function ClassGrid() {
  const userClassList = useSelector(selectClassList);

  if (userClassList.length > 0) {
    return (
        <div className="classes-container">
          { userClassList.map(id => <Class key={id} className={id} />)}
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

/*
  <Class className="CIS 350" />
  <Class className="CIS 471" />
  <Class className="CIS 401" />
  <Class className="CRIM 240" />
  <Class className="MATH 312" />
*/
