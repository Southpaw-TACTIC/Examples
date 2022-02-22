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

import './index.css';

function App() {  
return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route  path="/jobs" element={<Jobs />} />
            <Route  path="/job_details/:job_code" element={<JobDetails />} /> 
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
