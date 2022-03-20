import { React } from 'react';
import '../styles/ClassNote.css';
import { useNavigate } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';

function ClassDashboard() {
	const navigate = useNavigate();

	return (
		<>
			<BackpackNavbar/>	
			<div className="ClassNote">
				<h3>Adding a New Class Day...</h3>
                <h4>Type of Class</h4>
				<div>
				<button className="button_1" type="button"
					onClick={_ => navigate('/classNote')}>
					Lecture
				</button>
				<button className="button_1" type="button"
					onClick={_ => navigate('/classNote')}>
					Recitation
				</button>
				<button className="button_1" type="button"
					onClick={_ => navigate('/classNote')}>
					Seminar
				</button>
				</div>
				<h4>Date</h4>
				<input type="text"
                    className="center-rectangle2 enter"
                    placeholder="Enter date..." />
				<h4>Topic</h4>
				<input type="text"
                    className="center-rectangle2 enter"
                    placeholder="Enter the class topic..." />
				<button className="button_3" type="button" onClick={_ => navigate('/classDashboard')}>
					Continue
				</button>
			</div>
			
		
		</>
	);
}

export default ClassDashboard;