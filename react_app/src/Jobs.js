import React from "react";
//import { useState } from 'react'
//import ReactDOM from "react-dom";

import { Link } from "react-router-dom";

import { get_ticket, call_tactic } from "./Server";

import "./Jobs.css";

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  load = async () => {
    this.getJobs();
  };

  getJobs = async () => {
    let ticket = await get_ticket();
    console.log("Jobs.js - getJobs ticket: ",ticket);
    //query for a list of jobs
    let search_type = "workflow/job";
    let kwargs = {
      search_type: search_type,
    };
    let sobjects = await call_tactic("query", kwargs);
    console.log("Jobs.js - in getJobs  sobjects: ",sobjects);
    this.setState({ jobs: sobjects });
  };

  componentDidMount() {
    this.load();
  }

  render() {
    return (
      <div class="job">
        <div class="job-list">
          {this.state.jobs.map((job, index) => (
            <div key="{job.code}" class="card item">
              <div class="card-body">
                <h3 class="card-title">{job.name}</h3>
                <div>
                  Job Code:{" "}
                  <Link to={"/JobDetails/" + job.code}>{job.code}</Link> <br />
                  Name: {job.name} <br />
                  Status: {job.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Jobs;
