import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AboutPage from '../components/AboutPage';
import GpsPage from '../components/GpsPage';
import Header from '../components/shared/Header';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={GpsPage} exact={true} />
                <Route path="/about" component={AboutPage} exact={true} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;