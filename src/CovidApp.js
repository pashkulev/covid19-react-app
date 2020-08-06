import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import PlotsContainer from "./components/PlotsContainer/PlotsContainer";
import LineListData from "./components/LineListData/LIneListData";
import PatientDetails from "./components/PatientDetails/PatientDetails";
import Footer from "./components/Footer/Footer";
import "./CovidApp.css";

class CovidApp extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Navigation />

          <Route path="/" exact>
            <Redirect to="/covid-data-plots" />
          </Route>
          <Route path="/covid-data-plots" component={PlotsContainer} />
          <Route path="/line-list-data" component={LineListData} />
          <Route path="/patients/:id" component={PatientDetails} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default CovidApp;
