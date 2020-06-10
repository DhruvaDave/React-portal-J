import React, { Component } from "react";
import JobDataService from "../utils/getData";
 

export default class JobTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    // this.onChangeTiming = this.onChangeTiming.bind(this);
    this.saveJob = this.saveJob.bind(this);
    this.newJob = this.newJob.bind(this);

    this.state = {
      id: null,
      title: "",
      discription: "", 

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      discription: e.target.value
    });
    
  }

  // onChangeTiming(e) {
  //   this.setState({
  //     timing: e
  //   });
  //   console.log("------e-------",e);
  // }

  saveJob() {
    const data = {
      title: this.state.title,
      discription: this.state.discription,
      // timing: this.state.timing
    };

    JobDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          discription: response.data.discription,
          // timing: response.data.timing,
          // published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newJob() {
    this.setState({
      id: null,
      title: "",
      discription: "",
      // timing: new Date(),
      // published: false,

      submitted: false
    });
  }

  render() {
    // ...
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newJob}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="discription">Discription</label>
                <input
                  type="text"
                  className="form-control"
                  id="discription"
                  required
                  value={this.state.discription}
                  onChange={this.onChangeDescription}
                  name="discription"
                />
              </div>


              {/* <div className="form-group">
                <label htmlFor="timing">timing</label>
                <DatePicker
                  id="timing"
                  selected={this.state.timing}
                  onSelect={this.onChangeTiming}
                  showTimeSelect
                  dateFormat="Pp"
                  onChange={this.onChangeTiming}
                />
              </div> */}
  
              <button onClick={this.saveJob} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
}