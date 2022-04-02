import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Class.css';
import { readClass } from '../api/storage';

export const getClassData = id => {
  try {
    const data = readClass(id);
    return data;
  } catch (err) {
    console.log(`${id} trigger this error: ${err}`);
    return { id, err };
  }
};

export const dayTitle = ({ type, date, topic }) => {
  const datePieces = date.split('-');
  const month = Number(datePieces[1]);
  const day = Number(datePieces[2]);
  const shortDate = `${month}/${day}`;
  return `${type} ${shortDate}: ${topic}`;
};

function ClassIcon({ className }) {
  const navigate = useNavigate();

  return (
    <div
      className="Class"
      onClick={() => navigate(`/classdashboard/${className}`)}
      onKeyPress={() => navigate(`/classdashboard/${className}`)}
      role="link"
      tabIndex={0}
    >
      {className}
    </div>
  );
}

export default ClassIcon;
