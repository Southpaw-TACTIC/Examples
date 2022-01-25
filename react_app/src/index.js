import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import JobDetails from './JobDetails';
import Jobs from './Jobs';
import Test from './Test';
import AssetList from './AssetList';
import JobAssetList from './JobAssetList';

import './index.css';


function App() {  
return (
      <BrowserRouter>
    <Navbar />
    <Routes>
          <Route  path="/jobs" element={<Jobs />} />
          <Route  path="/test" element={<Test />} />
          <Route  path="/job_details/:job_code" element={<JobDetails />} /> 
          <Route  path="/jobassets" element={<JobAssetList />} />
          <Route path="/assets" element={<AssetList />} />
          <Route  path="/" render={() => <Navigate to="/jobs" />} />
       </Routes>
      </BrowserRouter>
    );
  }


ReactDOM.render(
 
  <App />
,
  document.getElementById('root')
);
