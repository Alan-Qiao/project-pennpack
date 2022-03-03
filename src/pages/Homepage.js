import { React } from 'react';
import '../styles/Homepage.css';
import BackpackNavbar from '../components/BackpackNavbar';

function Homepage() {

	return (
		<>
			<BackpackNavbar/>	
			<div className="Homepage">
			
				<h1>PennPack</h1>
				<button className="button" type="button">
					Login
				</button>
				<div className="spacer"/>
				<button className="button" type="button">
					New user
				</button>
			</div>
		</>
	);
}

export default Homepage;