import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import CoviDoc from "./components/CoviDoc/CoviDoc";
import BarPlot from "./components/BarPlot/BarPlot";
import LineListData from "./components/LineListData/LIneListData";
import Footer from "./components/Footer/Footer";
import "./CovidApp.css";

class CovidApp extends Component {
  state = {};

  render() {
    return (
      <div className="CovidApp container-fluid">
        <Navigation />
        <div className="row mt-3">
          <div className="col-12">
            <CoviDoc />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <BarPlot />
          </div>
        </div>
        {/* <div className="row mt-3">
          <div className="col-12">
            <LineListData />
          </div>
        </div> */}
        <div className="row mt-3">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default CovidApp;
