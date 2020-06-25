import React from 'react';
import {link, Link} from 'react-router-dom';


function Nav() {



    return (
        <nav className="navigation-bar">
            
            <h1 className="site-logo">
                <Link to="/">
                    Logo
                </Link>
            </h1>
            

            <ul className="navigation-list">
                <Link to="/signin">
                    <li className="navigation-sign-in">Sign In</li>
                </Link>
                <Link to="/signup">
                    <li>Sign up</li>
                </Link>
            </ul>
        </nav>
        );
    }

export default Nav;
