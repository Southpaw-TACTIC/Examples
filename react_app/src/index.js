import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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
        <Navbar />
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
  <React.StrictMode>
  <App />
</React.StrictMode>,
  document.getElementById('root')
);
