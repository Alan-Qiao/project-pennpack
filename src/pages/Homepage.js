import { React } from 'react';
import '../styles/Homepage.css';

function Homepage() {

	return (
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
	);
}

export default Homepage;