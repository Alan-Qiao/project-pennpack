import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Class.css';
import {
  createClass,
  getClasses,
  getAllUserClasses,
  getAllUserClassesByUsername,
  joinClass,
  readClass,
  readClassById
} from '../api/services';

export const getUserClasses = async() => {
  try {
    const { userClasses } = await getAllUserClasses();
    return userClasses;
  } catch (e) {
    return e.message;
  }
}

export const getUserClassesByUsername = async(username) => {
  try {
    const { userClasses } = await getAllUserClassesByUsername(username);
    return userClasses;
  } catch (e) {
    return e.message;
  }
}

export const getAllClasses = async () => {
  try {
    const { classes } = await getClasses();
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
    return { err: e.message }
  }
}

export const joinNewClass = async (classId) => {
  try {
    const data = await joinClass(classId);
    return data;
  } catch (e) {
    return { err: e.message };
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

export const dayTitle = (type, date, topic) => {
  const datePieces = date.substring(0,10).split('-');
  const month = Number(datePieces[1]);
  const day = Number(datePieces[2]);
  const shortDate = `${month}/${day}`;
  return `${type} ${shortDate}: ${topic}`;
};

function ClassIcon({ classId, className, mode }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (mode === 'join') {
      const body = await joinNewClass(classId);
      if (body.err) {
        if (body.err === 'user already in class') {
          alert('You have already enrolled in this class');
        }
        alert(`An error occured: ${body.err}`);
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
