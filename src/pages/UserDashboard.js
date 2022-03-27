import { React } from 'react';
import '../styles/UserDashboard.css';
import BackpackNavbar from '../components/BackpackNavbar';
import ClassGrid from '../components/ClassGrid';

function UserDashboard() {
  return (
    <>
      <BackpackNavbar />
      <div className="UserDashboard">
        <div className="left-align">
          Your classes
        </div>
        <ClassGrid />
      </div>
    </>
  );
}

export default UserDashboard;
