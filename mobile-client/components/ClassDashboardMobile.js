import { React, useEffect, useState } from 'react';
import '../styles/ClassDashboard.css';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getClassData, dayTitle } from '../components/Class';

function ClassDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prof, setProf] = useState('');
  const [days, setDays] = useState([]);

  useEffect(() => {
    const data = getClassData(id);
    if (data.err) {
      alert(`An Error Occured: ${data.err}`);
      navigate(-1);
    } else {
      setProf(data.prof);
      setDays(data.days);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="ClassDashboard">
        <h5 className="title">{id.toUpperCase()}</h5>
        <h6 className="subtitle">{prof}</h6>
        <button
          className="button1"
          type="button"
          onClick={() => navigate(`/classDashboard/${id}/addclassnote`)}
        >
          + Add Class Date
        </button>
        { days.map(day => (
            <button
              key={day.id}
              className="button2"
              type="button"
              onClick={() => navigate(`/classNote/${day.id}`)}
            >
              {dayTitle(day)}
            </button>
        ))}
      </div>
    </>
  );
}

export default ClassDashboard;
