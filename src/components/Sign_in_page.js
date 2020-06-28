import React from 'react';
import {Link} from 'react-router-dom';

export default function Sign_in_page(){          
    return(
        <div className="sign-in-page">
           <div className="sign-in-page-card">
               <div className="sign-in-page-logo"></div>
               <div className="sign-in-page-header">Sign in to Your account</div>
               <label for="email" className="sign-in-page-label">Email</label>
               <input type="text" className="sign-in-page-input" id="email"></input>
               <label for="password" className="sign-in-page-label">Password</label>
               <input type="text" className="sign-in-page-input" id="password"></input>
               <Link to="/content">
                    <button className="sign-in-page-button">SIGN IN</button>
                </Link>
            </div>
        </div>
    )
}
