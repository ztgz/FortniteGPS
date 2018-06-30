import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/shared/header.css';

const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark navLayout">
            <NavLink className="navbar-brand" to="/">FortniteGPS</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" exact={true}>GPS</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" className="nav-link" exact={true}>About</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Header;