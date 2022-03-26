import { React } from 'react';
import '../styles/ClassDashboard.css';
import { useNavigate } from 'react-router-dom';
import BackpackNavbar from '../components/BackpackNavbar';

function ClassDashboard() {
	const navigate = useNavigate();

	return (
		<>
			<BackpackNavbar/>	
			<div className="ClassDashboard">
				<h5>Class Name</h5>
                <h6>Professor Name</h6>
				<button className="button1" type="button"
					onClick={_ => navigate('/addclassnote')}>
					+ Add New Class Note
				</button>
				<button className="button2" type="button"
					onClick={_ => navigate('/classNote')}>
					React Applications
				</button>
				<button className="button2" type="button"
					onClick={_ => navigate('/classNote')}>
					Asynchronous Functions
				</button>
				
			</div>
		</>
	);
}

export default ClassDashboard;