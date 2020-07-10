import React from 'react';
import './App.scss';
import { PageContainer } from "./assets/styles/App.stype";
import Header from "./components/shared/Header";
import { Home, Category, SearchResult } from "./views";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export const Routes = Object.freeze({
    Root: '/',
    Home: '/home',
    SearchResult: '/search',
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
        <Router>
            <Header />

            <PageContainer>
                <Switch>
                    <Route path={Routes.Home} component={Home} />
                    <Route path={Routes.SearchResult} render={(props) => (
                        <SearchResult key={props.location.search} {...props} />)
                    } />
                    <Route path={Routes.Category} render={(props) => (
                        <Category key={props.match.params.id} {...props} />)
                    } />

                    <Route exact render={() => (
                        <Redirect to={Routes.Home} />
                    )} />

                    <Route path={Routes.NotFoundPage} component={NotFound}/>
                </Switch>
            </PageContainer>
        </Router>
  );
}

export default App;
