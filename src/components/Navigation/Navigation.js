import React from "react";

const Navigation = () => {
  return (
    <div className="row header mb-4">
      <nav className="navbar navbar-expand-md navbar-dark navigation">
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
              <a
                // activeClassName="active"
                // exact
                className="nav-link"
                // to="/plot-view"
              >
                Table View
              </a>
            </li>
            <li className="nav-item">
              <a
                // activeClassName="active"
                className="nav-link"
                // to="/air-sports"
              >
               Plot View
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
