import { React } from 'react';
import '../styles/UserDashboard.css';
import Navbar from '../components/Navbar';
import ClassGrid from '../components/ClassGrid';

function UserDashboard() {
  return (
    <>
      <Navbar />
      <div className="UserDashboard">
        <div className="left-align">
          Your classes
        </div>
        {/* <ClassGrid /> */}
      </div>
    </>
  );
}

export default UserDashboard;
