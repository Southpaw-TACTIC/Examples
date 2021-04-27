import React from 'react';

import { get_ticket, call_tactic } from "./Server";

import './JobDetails.css';

class JobDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      job: [],
      tasks: []
    }
  }

  load = async () => {

    //get a job info
    this.getJob()

    //get tasks
    this.getTasks()

  }

  getJob = async () => {
    let job_code = this.props.match.params.job_code
    console.log(job_code)

    let ticket = await get_ticket()
    console.log(ticket);

    //query for the job
    let search_type = "workflow/job"
    let kwargs = {
        search_type: search_type,
        filters: [['code', job_code]],
    };
    let sobjects = await call_tactic("query", kwargs)
    console.log(sobjects);
    this.setState({job: sobjects})
  }

  getTasks = async () => {

    let job_code = this.props.match.params.job_code

    let ticket = await get_ticket()

    // get tasks
    let search_type = "sthpw/task"
    let kwargs = {
        search_type: search_type,
        filters: [['search_code', job_code]],
    };
    let sobjects = await call_tactic("query", kwargs)
    console.log(sobjects);
    this.setState({tasks: sobjects})

  }

  componentDidMount() {
    this.load()
  }

  render() {
    return (
      <div class="job">
        <div class="job-detail">
          {
            this.state.job.map( (job, index) => (
              <div key="{job.code}">
                <div class="card item">
                  <div class="card-body">

                    <h2> {job.name} </h2>
                    Job Code: {job.code} <br/>
                    Status: {job.status}
                  </div>
                </div>
                <hr/>
                <h3>Tasks</h3>
                {
                  this.state.tasks.map((tasks,task_index) => (
                    <div class="card item">
                      <div class="card-body">
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
