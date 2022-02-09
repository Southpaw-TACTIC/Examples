import React from 'react';

import { Link }  from 'react-router-dom';

import {  get_server } from "./Server";

class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    }
  }

  load() {
    let server = get_server()
    let expr = "@SOBJECT(workflow/job)";
    let jobs = server.eval(expr);
    console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY')
    console.log("test.js - load() jobs: ", jobs, "expr: ", expr, "server: ", server)
    this.setState({ jobs: jobs })
  }

  componentDidMount() {
    this.load()
  }

  render() {
    return (
      <div className="job"> Test Page
        <div className="job-list">
        
          {
            this.state.jobs.map((job, index) => (
              <div key="{job.id}">
                Job Code: <Link to={"/JobDetails/" + job.code}>{job.code}</Link>  <br />
                ID: {job.id} <br/>
                Name: {job.name} <br />
                Status: {job.status} 
                <hr />
              </div>
            ))
          }
        
        </div>
      </div>
    );
  }


 

}

export default Test;
