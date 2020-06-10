import React, { Component } from "react";
import JobDataService from "../utils/getData";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTiming = this.onChangeTiming.bind(this);
    this.getJob = this.getJob.bind(this);
    this.updateJob = this.updateJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);

    this.state = {
      currentJob: {
        id: null,
        title: "",
        discription: "",
        timing: new Date(),
      },
      message: ""
    };
  }

  componentDidMount() {
    console.log("-----------Props----------",this.props);
    console.log("-----------Props----------",this.props.match.params.id);
    this.getJob(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentJob: {
          ...prevState.currentJob,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const discription = e.target.value;
    
    this.setState(prevState => ({
      currentJob: {
        ...prevState.currentJob,
        discription: discription
      }
    }));
  }

  onChangeTiming(e) {
    const timing = e;
    
    this.setState(prevState => ({
      currentJob: {
        ...prevState.currentJob,
        timing: timing
      }
    }));
  }

  getJob(id) {
    console.log("-------get---111---",id);
    JobDataService.getOne(id)
      .then(response => {
        this.setState({
          currentJob: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
      console.log("-------get--job");
  }


  updateJob() {
    JobDataService.update(
      this.state.currentJob.id,
      this.state.currentJob
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The mvoie data was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteJob() {    
    JobDataService.delete(this.state.currentJob.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/job')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentJob } = this.state;

    return (
      <div>
        {currentJob ? (
          <div className="edit-form">
            <h4>Job</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentJob.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="discription">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="discription"
                  value={currentJob.discription}
                  onChange={this.onChangeDescription}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="timing">Timing</label>
                <DatePicker
                  id="timing"
                  selected={Date.parse(currentJob.timing)}
                  onSelect={this.onChangeTiming}
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={this.onChangeTiming}
                />
                
              </div> */}
            </form>

            
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteJob}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateJob}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    );
  }
}