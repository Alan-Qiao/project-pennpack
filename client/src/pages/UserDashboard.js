import { React } from 'react';
import '../styles/UserDashboard.css';
import BackpackEnvelopeNavbar from '../components/BackpackEnvelopeNavbar';
import ClassGrid from '../components/ClassGrid';

function UserDashboard() {
  return (
    <>
      <BackpackEnvelopeNavbar />
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
