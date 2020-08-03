import React, { Component } from "react";
import Navigation from './components/Navigation/Navigation';
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
        <Navigation/>
        <div className="row">
          <div className="col-6">
            <CoviDoc/>
          </div>
          <div className="col-6">
            <BarPlot/>
          </div>
        </div>
        <LineListData/>
        <Footer />
      </div>
    );
  }
}

export default CovidApp;
