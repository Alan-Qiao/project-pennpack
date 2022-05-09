import { React, useEffect, useState } from 'react';
import '../styles/ClassDashboard.css';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getClassData, dayTitle } from '../components/Class';
import { readClassDays } from '../api/services';

function ClassDashboard() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [prof, setProf] = useState('');
  const [days, setDays] = useState([]);

  useEffect(() => {
    const readClassAsync = async () => {
      try {
        const data = await getClassData(name);
        setProf(data.professor);
        const days = await readClassDays(data._id);
        setDays(days);
      } catch (e) {
        alert(`An Error Occured: ${e.message}`);
        navigate(-1);
      }
    }
    readClassAsync();
  }, []);

  return (
    <>
      <Navbar />
      <div className="ClassDashboard">
        <h5 className="title">{name.toUpperCase()}</h5>
        <h6 className="subtitle">{prof}</h6>
        <button
          className="button1"
          type="button"
          onClick={() => navigate(`/classDashboard/${name}/addclassday`)}
        >
          + Add Class Date
        </button>
        { days.map(day => (
            <button
              key={day._id}
              className="button2"
              type="button"
              onClick={() => navigate(`/classday/${day._id}`)}
            >
              {dayTitle(day.type, day.date, day.topic)}
            </button>
        ))}
      </div>
    </>
  );
}

export default ClassDashboard;
