import React from "react";
import { Link } from "react-router-dom";
import { call_tactic } from "./Server";

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

   //query for a list of jobs
  getJobs = async () => {
    let search_type = "workflow/job";
    let kwargs = {
      search_type: search_type,
    };
    let sobjects = await call_tactic("query", kwargs);
    this.setState({ jobs: sobjects });
  };

  componentDidMount() {
    this.load();
  }

  render() {
    return (
      <div className="job">
        <div className="job-list">
          {this.state.jobs.map((job, index) => (
            <div job={job} key={job.id} className="card item">
              <div className="card-body">
                <h3 className="card-title">{job.name}</h3>
                <div>
                  Job Code:{" "}
                  <Link to={"/job_details/" + job.code}>{job.code}</Link> <br />
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
