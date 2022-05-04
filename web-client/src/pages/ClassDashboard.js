import { React, useEffect, useState } from 'react';
import '../styles/ClassDashboard.css';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getClassData, dayTitle } from '../components/Class';

function ClassDashboard() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [prof, setProf] = useState('');
  const [days, setDays] = useState([]);

  useEffect(() => {
    const readClassAsync = async () => {
      const data = await getClassData(name);
      if (data.err) {
        alert(`An Error Occured: ${data.err}`);
        navigate(-1);
      } else {
        setProf(data.professor);
        setDays(data.classDays);
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
          onClick={() => navigate(`/classDashboard/${name}/addclassnote`)}
        >
          + Add Class Date
        </button>
        { days.map(day => (
            <button
              key={day._id}
              className="button2"
              type="button"
              onClick={() => navigate(`/classNote/${day._id}`)}
            >
              {dayTitle(day)}
            </button>
        ))}
      </div>
    </>
  );
}

export default ClassDashboard;
