import React from 'react';
import {Link} from 'react-router-dom';

export default function Sign_up_page(){          
    return(
        <div className="sign-up-page">
           <div className="sign-up-page-card">
               <div className="sign-up-page-logo"></div>
               <div className="sign-up-page-header">Create account</div>
               <label for="email" className="sign-up-page-label">Email</label>
               <input type="text" className="sign-up-page-input" id="email"></input>
               <label for="password" className="sign-up-page-label">Password</label>
               <input type="text" className="sign-up-page-input" id="password"></input>
               <label for="password_confirmation" className="sign-up-page-label">Password confirmation</label>
               <input type="text" className="sign-up-page-input" id="password_confirmation"></input>
               <Link to="/content">
                    <button className="sign-up-page-button">CREATE</button>
                </Link>
            </div>
        </div>
    )
}
