import { React, useEffect, useState } from 'react';
import '../styles/UserDashboard.css';
import Navbar from '../components/Navbar';
import ClassGrid from '../components/ClassGrid';
import { getClassDataById, getUserClasses } from '../components/Class';

function UserDashboard() {
  const [userClasses, setUserClasses] = useState([]);

  const fetchUserClasses = async () => {
		const allClasses = await getUserClasses();
    if (allClasses.err) {
      alert(`An error occured: ${allClasses.err}`)
    }

    // Need to get each individual class (need id, classname)
    const curClasses = [];
    for (let i = 0; i < allClasses.length; i++) {
      curClasses.push(getClassDataById(allClasses[i]));
    }
    const newClasses = await Promise.all(curClasses);
    setUserClasses(() => newClasses);
  }

  useEffect(() => {
		fetchUserClasses()
	}, []);


  return (
    <>
      <Navbar />
      <div className="UserDashboard">
        <div className="left-align">
          Your classes
        </div>
        <ClassGrid classes={userClasses}/>
      </div>
    </>
  );
}

export default UserDashboard;
