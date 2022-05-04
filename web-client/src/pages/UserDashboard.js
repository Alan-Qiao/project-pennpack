import { React, useEffect, useState } from 'react';
import '../styles/UserDashboard.css';
import Navbar from '../components/Navbar';
import ClassGrid from '../components/ClassGrid';
import { getClassDataById, getUserClasses } from '../components/Class';

function UserDashboard() {
  const [userClasses, setUserClasses] = useState([]);

  const fetchUserClasses = async () => {
    console.log('in fetchUserClasses in UserDashboard');
		const allClasses = await getUserClasses();
    if (allClasses.err) {
      alert(`An error occured: ${allClasses.err}`)
    }
    console.log('allClasses in fetchUserClasses is');
    console.log(allClasses);

    // Need to get each individual class (need id, classname)
    for (let i = 0; i < allClasses.length; i++) {
      const currClass = await getClassDataById(allClasses[i])
      setUserClasses(oldArray => [...oldArray, currClass]);
    }
    
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
