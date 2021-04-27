import React from 'react';
//import { useState } from 'react'
import ReactDOM from 'react-dom';


import {
  Link,
} from 'react-router-dom';

import { get_ticket, get_endpoint, get_server } from "./Server";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    }
  }

  load() {
    let server = get_server()
    let expr = "@SOBJECT(workflow/job)";
    let jobs = server.eval(expr);
    console.log("YYYYYYYYYYYYYYYYYYYYYYYYY")
    console.log(jobs)
    this.setState({jobs: jobs})
  }

  componentDidMount() {
    this.load()
  }

  render() {
    return (
      <div className="job"> Test Page
        <div className="job-list">
          {
            this.state.jobs.map( (job, index) => (
              <div key="{job.code}">
                Job Code: <Link to={"/job_details/" + job.code }>{job.code}</Link>  <br/>
                Name: {job.name} <br/>
                Status: {job.status}
                <hr/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Test;
