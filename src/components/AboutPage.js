import React from 'react';
import "../styles/about-page.css";

const AboutPage = () => (
    <div className="row justify-content-center">
        <div className="col-11 col-md-8 about mt-4 py-3">
            <h1>About</h1>
            <p>
                FnGPS is a post game analyse tool to determine the minimum running time 
                for a specific route in fortnite battle royale. The duration of each route is calculated based on the ingame 
                running speed on flat ground.
            </p>
            <br />
            <h1>Contact</h1>
            <form action="mailto:support@fortnitegps.com" method="post" enctype="text/plain">
                To contact fnGPS please email: support@arvidzetterberg.se
                <button className="btn btn-primary mx-2" type="submite">
                    <i className="fas fa-envelope" /> email
                </button>
            </form>
        </div>
    </div>
);

export default AboutPage;