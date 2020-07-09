import React from 'react';
import './App.css';
import Header from "./components/shared/Header";
import { Home, Category } from "./views";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link } from "react-router-dom";

export const Routes = Object.freeze({
    Root: '/',
    Home: '/home',
    Category: '/category/:id',
    NotFoundPage: '*'
});

const NotFound = ({ location }) => (
    <div>
        <strong>Error!</strong> No route found matching:
        <div>
            <code>{location.pathname}</code>
        </div>
    </div>
);

function App() {
  return (
        <>
            <Header/>

            <Switch>
                <Route path={Routes.Home} component={Home} />
                <Route path={Routes.Category} render={(props) => (
                    <Category key={props.match.params.id} {...props} />)
                } />

                <Route exact render={() => (
                    <Redirect to={Routes.Home} />
                )} />

                <Route path={Routes.NotFoundPage} component={NotFound}/>
            </Switch>
        </>
  );
}

export default App;
