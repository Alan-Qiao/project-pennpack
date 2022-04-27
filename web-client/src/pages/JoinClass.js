import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JoinClass.css';
import Navbar from '../components/Navbar';
import ClassGrid from '../components/ClassGrid';
import { getAllClasses } from '../components/classes';

function JoinClass() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    console.log('in fetchClasses in JoinClass');
		const allClasses = await getAllClasses();
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
      <ClassGrid classes={classes}/>
      {/* REPLACE ABOVE WITH A MAPPING OF ALL CLASSES FROM DB */}
      </div>
    </>
  );
  
}

export default JoinClass;
