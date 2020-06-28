import React from 'react';
import {link, Link} from 'react-router-dom';


export default function Main_page(){          
    return(
        <div className="main-page">
            <div className="main-page-landing">
                <div className="main-page-top">
                    <div className="main-page-header-container">
                        <h1 className="main-page-header">Journal Your Fit Day </h1>
                        <p className="main-page-header-text">Save all the food You've had and track it's nutrition. Mark how much weight You've lost, how You've kept your caloric needs and whatever else comes to your mind</p>
                        <div className="main-page-cta">
                            <Link to="/signup">
                                <button className="main-page-cta-button">SIGN UP</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-page-features">
                <div className="main-page-features-header">
                    <h2 >Features</h2>
                </div>
                <section className="main-page-features-feature"></section>
                <section className="main-page-features-feature"></section>
                <section className="main-page-features-feature"></section>
            </div>
        </div>
    )
}
