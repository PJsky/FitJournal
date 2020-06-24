import React from 'react';
import {link, Link} from 'react-router-dom';


function Nav() {
    return (
        <nav className="navigation-bar">
            <h1 className="site-logo">Logo</h1>
            <ul className="navigation-list">
                <li className="navigation-sign-in">Sign In</li>
                <li>Sign Out</li>
            </ul>
        </nav>
        );
    }

export default Nav;
