import React, { Component } from "react";
import CoviDoc from "./components/CoviDoc/CoviDoc";
import Footer from "./components/Footer/Footer";
import "./CovidApp.css";

class CovidApp extends Component {
  state = {};

  render() {
    return (
      <div className="CovidApp container-fluid">
        <div className="row">
          <h1 className="col-12 header">Covid-19 Statistics App</h1>
        </div>
        <div className="row">
          <div className="col-6">
            <CoviDoc/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CovidApp;
