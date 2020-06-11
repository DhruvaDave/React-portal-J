import React, { Component } from "react";
import JobDataService from "../utils/getData";
import { Link } from "react-router-dom";
// import Dropzone from 'react-dropzone';
import Modal from "./Modal";

// const upload = multer({dest:'./uploads/'});

export default class jobsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveJobs = this.retrieveJobs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveJob = this.setActiveJob.bind(this);
    this.removeAllJobs = this.removeAllJobs.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Jobs: [],
      currentJob: null,
      currentIndex: -1,
      searchTitle: "",
      resume : "",
    };
  }

  componentDidMount() {
    this.retrieveJobs();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveJobs() {
    JobDataService.getAll()
      .then(response => {
        this.setState({
          jobs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveJobs();
    this.setState({
      currentJob: null,
      currentIndex: -1
    });
  }

  setActiveJob(job, index) {
    this.setState({
      currentJob: job,
      currentIndex: index
    });
  }

  removeAllJobs() {
    JobDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    JobDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          jobs: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleChange(e) {
    // const target = e.target;
    // const resume = target.resume;
    // const value = target.value;

    // this.setState({
    //   [resume]: value
    // });
  }

  handleSubmit(e) {
    // this.setState({ resume: upload.single('resume') });
    alert("Uploaded successfullt. We will get back to you soon !!!");
    // this.setState({ resume: this.state.modalInputName });
    this.modalClose();
  }

  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({
      modalInputName: "",
      modal: false
    });
  }

  render() {
    const { searchTitle, jobs, currentJob, currentIndex } = this.state;

    return (
      <div className="list row">
        {/* <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div> */}


        <div className="col-md-12">
         
            <div className="row">
                <div className="col-md-4">
                  <h4>Job List</h4>  
                </div>
                <div className="col-md-8">
                  
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={this.onChangeSearchTitle}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.searchTitle}
                    >
                      Search
                    </button>
                  </div>
                  </div>
              </div>
            </div>
          <div className="row">
            <div className="col-md-8">
            <ul className="list-group">
              {jobs &&
                jobs.map((job, index) => (
                  <li
                    className={
                      "list-group-item bg-color " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveJob(job, index)}
                    key={index}
                  >
                    <div className="container">
                      <div className="left">
                          {job.title} <br/>
                          {job.discription}
                      </div>
                      <div className="right">
                          {job.title} <br/>
                          <a className="apply-btn" href="javascript:;" onClick={e => this.modalOpen(e)} >
                            Apply
                          </a>
                              
                          <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                            <h2>Hello Modal</h2>
                            <div className="form-group">
                              <label>Upload Resume:</label>
                              <input type="file"
                                value={this.state.modalInputName}
                                name="modalInputName"
                                onChange={e => this.handleChange(e)}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group">
                              <button onClick={e => this.handleSubmit(e)} type="button">
                                Save
                              </button>
                            </div>
                          </Modal>
                      </div>
                    </div>
                  
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-md-4">
          {currentJob ? (
            <div>
              <h4>Job</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentJob.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentJob.discription}
              </div>
              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {currentJob.location}
              </div>
              <Link
                to={"/job/" + currentJob.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Job...</p>
            </div>
          )}
        </div>
        </div>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllJobs}
          >
            Remove All
          </button>
        </div>
      </div>
    );
  }
}