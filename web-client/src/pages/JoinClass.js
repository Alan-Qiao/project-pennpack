import { React, useEffect, useState } from 'react';
import '../styles/JoinClass.css';
import Navbar from '../components/Navbar';
import ClassGrid from '../components/ClassGrid';
import { getAllClasses } from '../components/Class';

function JoinClass() {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
		const allClasses = await getAllClasses();
    if (allClasses.err) {
      alert(`An error occured: ${allClasses.err}`)
    }
    setClasses(allClasses);
  }

  useEffect(() => {
		fetchClasses()
	}, []);


  return (
    <>
      <Navbar />
      <div className="JoinClass">
      <div className="left-align">
        Classes On PennPack
      </div>
      <ClassGrid classes={classes} mode="join"/>
      </div>
    </>
  );
  
}

export default JoinClass;
