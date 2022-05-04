import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Class.css';
import { createClass, getClasses, getAllUserClasses, joinClass, readClass, readClassById } from '../api/services';

export const getUserClasses = async() => {
  console.log('in getUserClasses in classes');
  try {
    const { userClasses } = await getAllUserClasses();
    console.log(userClasses);
    return userClasses;
  } catch (e) {
    return e.message;
  }
}
export const getAllClasses = async () => {
  console.log('in getAllClasses in classes');
  try {
    const { classes } = await getClasses();
    console.log(classes);
    return classes;
  } catch (e) {
    return e.message;
  }
}

export const createNewClass = async (className, professor) => {
  try {
    const res = await createClass(className, professor);
    return res;
  } catch (e) {
    return e.message
  }
}

export const joinNewClass = async (classId) => {
  try {
    console.log(classId);
    await joinClass(classId);
  } catch (e) {
    return e.message;
  }
}

export const getClassDataById = async (id) => {
  try {
    const data = await readClassById(id);
    return data;
  } catch (err) {
    console.log(`${id} trigger this error: ${err.message}`);
    return { id, err: err.message };
  }
};

export const getClassData = async (name) => {
  try {
    const data = await readClass(name);
    return data;
  } catch (err) {
    console.log(`${name} trigger this error: ${err.message}`);
    return { name, err: err.message };
  }
};

export const dayTitle = ({ type, date, topic }) => {
  const datePieces = date.split('-');
  const month = Number(datePieces[1]);
  const day = Number(datePieces[2]);
  const shortDate = `${month}/${day}`;
  return `${type} ${shortDate}: ${topic}`;
};

function ClassIcon({ classId, className, mode }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (mode === 'join') {
      console.log(classId);
      const err = await joinNewClass(classId);
      if (err) {
        if (err === 'user in class') {
          alert('You have already enrolled in this class');
        }
        alert(`An error occured: ${err}`);
      }
    }
    navigate(`/classdashboard/${className}`);
  }

  return (
    <div
      className="Class"
      onClick={() => handleClick()}
      onKeyPress={() => handleClick()}
      role="link"
      tabIndex={0}
    >
      {className}
    </div>
  );
}


export default ClassIcon;
