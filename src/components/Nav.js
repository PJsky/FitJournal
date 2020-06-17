import React from 'react';
import {link, Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Menu as MenuIcon} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


function Nav() {
    const classes = useStyles();
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
