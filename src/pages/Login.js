import { React } from 'react';
import '../styles/LoginSignup.css';
import BackpackNavbar from '../components/BackpackNavbar';

function Login() {

	return (
		<>
			<BackpackNavbar/>	
			<div className="Login">
				<h1>Log in</h1>
                <div className='left-align'>
                    Username
                </div>               
				<input type="text"
                    className="center-rectangle enter"
                    placeholder="Enter your username..." />
                <div className='spacer'/>
                <div className='left-align'>
                    Password
                </div>          
                <input type="text"
                    className="center-rectangle enter"
                    placeholder="Enter your password..." />
                <div className='spacer'/>
                <div className='spacer'/>
                <div className='spacer'/>
                <button className="button" type="button">
					Continue
				</button>
			</div>
		</>
	);
}

export default Login;