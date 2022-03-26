import { React } from 'react';
import '../styles/UserDashboard.css';
import BackpackNavbar from '../components/BackpackNavbar';
import Class from '../components/Class';

function UserDashboard() {
  return (
    <>
      <BackpackNavbar />
      <div className="UserDashboard">
        <div className="left-align">
          Your classes
        </div>
        <div className="classes-container">
          <Class className="CIS 350" />
          <Class className="CIS 471" />
          <Class className="CIS 401" />
          <Class className="CRIM 240" />
          <Class className="MATH 312" />
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
