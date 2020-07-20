import React from 'react';
import {link, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {log_out} from '../actions/auth';


function Nav() {

    const isLogged = useSelector(state => state.user);
    const dispatch = useDispatch();
    if(!isLogged)
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
    else
        return(
            <nav className="navigation-bar">
                
            <h1 className="site-logo">
                <Link to="/">
                    Logo
                </Link>
            </h1>
            

            <ul className="navigation-list">
                    <li className="navigation-sign-in" onClick={()=>{localStorage.setItem("token", ""); dispatch(log_out())}}>Sign Out</li>
            </ul>
        </nav>
        )
    }

export default Nav;
