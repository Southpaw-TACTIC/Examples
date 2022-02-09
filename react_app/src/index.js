import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import {
  BrowserRouter,
  Routes,
  Route
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
            <Route  path="/job_details/:job_code" element={<JobDetails />} /> 
          <Route  path="/jobassets" element={<JobAssetList />} />
          <Route  path="/assets" element={<AssetList />} />
          <Route  path="/test" element={<Test />} />
          <Route  path="*" element={<Jobs />} />
       </Routes>
     </BrowserRouter>
    );
  }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
