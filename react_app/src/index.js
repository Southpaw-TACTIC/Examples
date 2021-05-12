import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import JobDetails from './JobDetails';
import Jobs from './Jobs';
import Test from './test';
import AssetList from './AssetList';
import JobAssetList from './JobAssetList';

import './index.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <nav class="navbar navbar-dark bg-dark navbar-custom">
          <div class="container">
            <a class="navbar-brand" href="/">TACTIC</a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent1"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              class="collapse navbar-collapse"
              id="navbarSupportedContent1"
            >
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <Link to="/jobs">All Jobs</Link> <br />
                </li>
                <li class="nav-item">
                  <Link to="/jobassets">Job Assets</Link>
                </li>
                <li class="nav-item">
                  <Link to="/assets">Assets</Link>
                </li>
                <li class="nav-item">
                  <Link to="/test">Test</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/job_details/:job_code" component={JobDetails} />
          <Route exact path="/jobassets" component={JobAssetList} />
          <Route exact path="/assets" component={AssetList} />
          <Redirect from="/" to="/jobs" exact />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
