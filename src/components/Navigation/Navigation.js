import React from "react";
import {NavLink} from 'react-router-dom';

const Navigation = () => {
  return (
    <header>
      <div className="row">
        <nav className="navbar navbar-expand-md bg-dark navbar-dark navigation col-12">
          <span className="navbar-brand" to="/">
            Covid-19 Statistics App
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  // exact
                  className="nav-link"
                  to="/covid-data-plots"
                >
                  Covid Data Plots
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/line-list-data"
                >
                  Covid Line List Data
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
