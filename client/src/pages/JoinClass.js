import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JoinClass.css';
import Navbar from '../components/Navbar';
import ClassGrid from '../components/ClassGrid';

function JoinClass() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="JoinClass">
      <div className="left-align">
        Classes On PennPack
      </div>
      {/* REPLACE ABOVE WITH A MAPPING OF ALL CLASSES FROM DB */}
      </div>
    </>
  );
}

export default JoinClass;
