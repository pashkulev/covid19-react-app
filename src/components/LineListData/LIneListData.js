import React, { Component } from "react";
import PatientService from "../../services/PatientService";
import PatientListItem from "../PatientListItem/PatientListItem";
import SelectComponent from "../SelectComponent/SelectComponent";
import Loading from "../Loading/Loading";

const FILTERS = ["Country", "Location", "Gender", "Age"];

export default class LineListData extends Component {
  state = {
    isReady: false,
    filters: [],
    countries: [],
    selectedCountry: "",
    locations: [],
    selectedLocation: "",
    selectedGender: "male",
    fromAge: null,
    toAge: null,
    patients: [],
    message: "",
  };

  componentDidMount = async () => {
    const patients = await PatientService.getPatients({});
    const countries = await PatientService.getCountries();

    this.setState({
      isReady: true,
      patients: patients,
      countries: countries,
      selectedCountry: countries.length > 0 ? countries[0] : "",
    });
  };

  componentDidUpdate() {
    if (this.state.message) {
      setTimeout(() => this.setState({ message: "" }), 5000);
    }
  }

  filtersChangedHandler = (event) => {
    const filterName = event.target.value;
    const filterIndex = this.state.filters.indexOf(filterName);

    let newFilters = [...this.state.filters];

    if (filterIndex === -1) {
      newFilters.push(filterName);
    } else {
      newFilters.splice(filterIndex, 1);
    }

    this.setState({ filters: newFilters });
  };

  countryChangedHandler = async (event) => {
    try {
      const country = event.target.value;
      const locations = await PatientService.getLocationsByCountry(country);

      const newState = {
        selectedCountry: country,
        selectedLocation: locations.length > 0 ? locations[0] : "",
        locations: locations.length > 0 ? locations : [],
      };

      this.setState(newState);
    } catch (error) {
      console.log(error);
    }
  };

  locationChangedHandler = async (event) => {
    this.setState({ selectedLocation: event.target.value });
  };

  genderChangedHandler = (event) => {
    this.setState({ selectedGender: event.target.value });
  };

  lowerAgeChangedHandler = (event) => {
    this.setState({ fromAge: event.target.value });
  };

  upperAgeChangedHandler = (event) => {
    this.setState({ toAge: event.target.value });
  };

  searchButtonHandler = async () => {
    let searchParamsObject = {};

    if (this.state.filters.includes(FILTERS[0])) {
      searchParamsObject.country = this.state.selectedCountry;
    }

    if (
      this.state.filters.includes(FILTERS[1]) &&
      this.state.selectedLocation !== ""
    ) {
      searchParamsObject.location = this.state.selectedLocation;
    }

    if (this.state.filters.includes(FILTERS[2])) {
      searchParamsObject.gender = this.state.selectedGender;
    }

    if (this.state.filters.includes(FILTERS[3])) {
      if (this.state.fromAge >= this.state.toAge) {
        this.setState({
          message: '"To Age" should have a bigger value than "From Age"!',
        });
        return;
        
      } else {
        searchParamsObject.fromAge = this.state.fromAge;
        searchParamsObject.toAge = this.state.toAge;
      }
    }

    const searchResult = await PatientService.getPatients(searchParamsObject);

    this.setState({
      patients: searchResult,
    });
  };

  viewAllHandler = async () => {
    const patients = await PatientService.getPatients({});

    this.setState({
      patients: patients,
      selectedCountry:
        this.state.countries.length > 0 ? this.state.countries[0] : "",
        filters: []
    });
  };

  render = () => {
    const patients = this.state.patients.map((p, index) => (
      <PatientListItem key={index} data={p} />
    ));

    const filterCheckboxes = FILTERS.map((filter, index) => (
      <div className="form-group" key={index}>
        <input
          id={filter.toLowerCase() + "Checkbox"}
          type="checkbox"
          value={filter}
          checked={this.state.filters.includes(filter)}
          onChange={this.filtersChangedHandler}
        />
        <label htmlFor={filter.toLowerCase() + "Checkbox"}>{filter}</label>
      </div>
    ));

    return (
      <div>
        {this.state.message ? (
          <div className="row notification">
            <div className="col-12">{this.state.message}</div>
          </div>
        ) : null}
        <div className="row">
          <div className="col-3 table-filter">
            <div className="my-3">Select Filters</div>
            <hr />
            {filterCheckboxes}
            {this.state.filters.includes(FILTERS[0]) ? (
              <div className="mt-3">
                <hr />
                <SelectComponent
                  id="countries"
                  optionValues={this.state.countries}
                  label="Country"
                  selected={this.state.selectedCountry}
                  changeHandler={this.countryChangedHandler}
                />

                {this.state.locations.length > 1 &&
                this.state.filters.includes(FILTERS[1]) ? (
                  <SelectComponent
                    id="locations"
                    optionValues={this.state.locations}
                    label="Location"
                    selected={this.state.selectedLocation}
                    changeHandler={this.locationChangedHandler}
                  />
                ) : null}
              </div>
            ) : null}
            {this.state.filters.includes(FILTERS[2]) ? (
              <div>
                <hr />
                <div>Filter by Gender:</div>
                <div className="form-inline my-2">
                  <div className="form-group">
                    <input
                      id="maleRadioBtn"
                      type="radio"
                      value="male"
                      onChange={this.genderChangedHandler}
                      checked={this.state.selectedGender === "male"}
                    />
                    <label htmlFor="maleRadioBtn">Male</label>
                  </div>
                  <div className="form-group">
                    <input
                      id="femaleRadioBtn"
                      type="radio"
                      value="female"
                      onChange={this.genderChangedHandler}
                      checked={this.state.selectedGender === "female"}
                    />
                    <label htmlFor="femaleRadioBtn">Female</label>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.filters.includes(FILTERS[3]) ? (
              <div>
                <hr />
                <div className="my-2">Filter By Age:</div>
                <div className="row mb-2">
                  <div className="col-6 text-right">
                    <label htmlFor="fromAge">From:</label>
                  </div>
                  <div className="col-6">
                    <input
                      id="fromAge"
                      type="number"
                      className="form-control"
                      onChange={this.lowerAgeChangedHandler}
                      value={this.state.fromAge}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-6 text-right">
                    <label htmlFor="toAge">To:</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="number"
                      className="form-control"
                      onChange={this.upperAgeChangedHandler}
                      value={this.state.toAge}
                      min="1"
                      max="120"
                    />
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.filters.length > 0 ? (
              <div className="my-2">
                <button
                  className="btn-success w-100"
                  onClick={this.searchButtonHandler}
                >
                  Search
                </button>
              </div>
            ) : null}
            <div className="mb-2">
              <button
                className="btn-secondary w-100"
                onClick={this.viewAllHandler}
              >
                View All
              </button>
            </div>
          </div>
          <div className="col-9">
            <div className="row bg-secondary text-light py-2">
              <div className="col-1">ID</div>
              <div className="col-2">Country</div>
              <div className="col-3">Location</div>
              <div className="col-1">Gender</div>
              <div className="col-1">Age</div>
              <div className="col-2">Reporting Date</div>
              <div className="col-2">See Details</div>
            </div>
            {!this.state.isReady ? <Loading/> : null}
            {this.state.patients.length === 0 && this.state.isReady ? (
              <div className="noResults">
                <h1>No Results for provided filters</h1>
              </div>
            ) : (
              patients
            )}
          </div>
        </div>
      </div>
    );
  };
}
