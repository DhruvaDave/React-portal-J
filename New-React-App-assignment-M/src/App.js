import React, { Component } from "react";
import { getList, getWarData } from "./utils/getData";
// import Autocomplete from 'react-autocomplete';
// import ResultData from './component/ResultData';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import AddJob from "./component/add-job.component";
import JobCom from "./component/job.component";
import JobsList from "./component/jobs-list.component";

import "./App.css";

class App extends Component {
  state = {
    searchTerm: "",
    allDataList: [],
    value: '',
    searchResult: []
  };

 

  render() {
    return (
    
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/job/findAll" className="navbar-brand">
              Job
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/job/findAll"]} component={JobsList} />
              <Route exact path="/add" component={AddJob} />
              <Route path="/job/:id" component={JobCom} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
