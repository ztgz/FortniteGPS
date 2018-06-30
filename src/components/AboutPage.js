import React from 'react';
import "../styles/about-page.css";

const AboutPage = () => (
    <div className="row justify-content-center">
        <div className="col-11 col-md-8 about mt-4 py-3">
            <h1>About</h1>
            <p>
                FortniteGPS is a post game analyse tool to determine the minimum running time 
                for a specific route. The duration of each route is calulated based off the ingame 
                running speed on flat ground.
            </p>
            <br />
            <h1>Contact</h1>
            <form action="mailto:support@fortnitegps.com" method="post" enctype="text/plain">
                To contact fortnite gps please email: support@fortnitegps.com
                <button className="btn btn-primary mx-2" type="submite">
                    <i className="fas fa-envelope" /> email
                </button>
            </form>
            <p>
                or twitter @FortniteGPS 
                <a className="btn btn-primary mx-2" href="https://twitter.com/FortniteGPS">
                    <i className="fab fa-twitter" /> twitter
                </a>
            </p>
            
        </div>
    </div>
);

export default AboutPage;