import React from "react";
import { call_tactic } from "./Server";
import './JobDetails.css';

const GetJobCode = () => {
  let urlStr = window.location.pathname;
  let jobId = urlStr.substring(urlStr.lastIndexOf("/") + 1);
return jobId;
}
class JobDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      job: [],
      tasks: []
    };
  }

  load = async () => {
    //get a job info
    this.getJob()
    //get tasks
    this.getTasks()
  }

  getJob = async () => {
    //let jobId = this.props.match.params.job.id; //depreciated React v.6
    let jobId =  GetJobCode();
    //query for the job
    let search_type = "workflow/job"
    let kwargs = {
        search_type: search_type,
       filters: [['code', jobId]], // this caused the problem
    };
    let sobjects = await call_tactic("query", kwargs);
    console.log("JobDetails.js - getJob sobjects: ",sobjects);
    this.setState({job: sobjects})
  }

  getTasks = async () => {
    let job_id = GetJobCode();
    // get tasks
    let search_type = "sthpw/task"
    let kwargs = {
        search_type: search_type,
        filters: [['search_code', job_id]],
    };
    let sobjects = await call_tactic("query", kwargs)
    this.setState({tasks: sobjects})
  }

  componentDidMount() {
    this.load()
  }

  render() {
    return (
      <div className="job">
        <div className="job-detail">
          {
            this.state.job.map( (job, index) => (
              <div job={job} key={job.id}>
                <div className="card item">
                  <div className="card-body">
                    <h2> {job.name} </h2>
                    Job Code: {job.code} <br/>
                    Status: {job.status}
                  </div>
                </div>
                <hr/>
                <h3>Tasks</h3>
                {
                  this.state.tasks.map((tasks,task_index) => (
                    <div tasks={tasks} key={tasks.id} className="card item">
                      <div className="card-body">
                        <h4>Process: {tasks.process}</h4> <br/>
                        <h5>Assigned: {tasks.assigned}</h5>
                        <p>Timestamp: {tasks.timestamp}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default JobDetails;
