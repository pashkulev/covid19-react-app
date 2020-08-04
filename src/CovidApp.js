import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import PlotsContainer from "./components/PlotsContainer/PlotsContainer";
import LineListData from "./components/LineListData/LIneListData";
import Footer from "./components/Footer/Footer";
import "./CovidApp.css";

class CovidApp extends Component {
  state = {};

  render() {
    return (
      <BrowserRouter>
        <div className="CovidApp container-fluid">
          <Navigation />

          <Route path="/" exact>
            <Redirect to="/plot-view" />
          </Route>
          <Route path="/plot-view" component={PlotsContainer} />
          <Route path="/table-view" component={LineListData} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default CovidApp;
