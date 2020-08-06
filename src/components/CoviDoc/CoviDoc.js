import React, { Component } from "react";
import Draggable from "react-draggable";
import ScatterPlot from "../ScatterPlot/ScatterPlot";
import LegendBox from "../LegendBox/LegendBox";
import ObservationPeriod from "../ObservationPeriodBox/ObservationPeriodBox";
import SelectComponent from "../SelectComponent/SelectComponent";
import CoviDocService from "../../services/CoviDocService";
import Handle from "../Handle/Handle";
import "./CoviDoc.css";

const WORLDWIDE_COVID_STATISTICS = "Worldwide Covid Statistics";

export default class CoviDoc extends Component {
  state = {
    country_regions: [],
    selected_country_region: "",
    defaultCountryRegion: "",
    province_states: [],
    selected_state_province: "",
    covidocs: [],
    plotHeader: WORLDWIDE_COVID_STATISTICS,
    showConfirmed: true,
    showRecovered: true,
    showDeaths: true,
    showMoveMeHint: false,
  };

  componentDidMount = async () => {
    try {
      const countryRegions = await CoviDocService.getCountryRegions();

      this.setState({
        country_regions: countryRegions,
        province_states: [],
        defaultCountryRegion: countryRegions[0],
        selected_country_region: countryRegions[0],
      });

      this.worldwideStatsButtonHandler();
    } catch (error) {
      console.log(error);
    }
  };

  countryRegionChangedHandler = async (event) => {
    try {
      const countryRegion = event.target.value;
      const provinceStates = await CoviDocService.getProvinceStatesByCountryRegion(
        countryRegion,
      );
      const countryRegionCovidocs = await CoviDocService.getCoviDocsByCountryRegion(
        countryRegion,
      );

      const newState = {
        selected_country_region: countryRegion,
        covidocs: countryRegionCovidocs,
        plotHeader: "Covid Statistics for " + countryRegion,
        selected_state_province: "",
        province_states: provinceStates.length !== 0 ? provinceStates : [],
      };

      this.setState(newState);
    } catch (error) {
      console.log(error);
    }
  };

  stateProvinceChangedHandler = async (event) => {
    try {
      const provinceState = event.target.value;
      const provinceStateCovidocs = await CoviDocService.getCoviDocsByProvinceState(
        this.state.selected_country_region,
        provinceState,
      );

      this.setState({
        selected_state_province: provinceState,
        covidocs: provinceStateCovidocs,
        plotHeader:
          "Covid Statistics for " +
          this.state.selected_country_region +
          " (" +
          provinceState +
          ")",
      });
    } catch (error) {
      console.log(error);
    }
  };

  tracesCheckboxHandler = (event) => {
    switch (event.target.value) {
      case "Confirmed":
        this.setState({ showConfirmed: !this.state.showConfirmed });
        break;
      case "Recovered":
        this.setState({ showRecovered: !this.state.showRecovered });
        break;
      case "Deaths":
        this.setState({ showDeaths: !this.state.showDeaths });
        break;
      default:
        break;
    }
  };

  worldwideStatsButtonHandler = async () => {
    try {
      const covidocs = await CoviDocService.getWorldwideStatistics();

      this.setState({
        covidocs: covidocs,
        plotHeader: WORLDWIDE_COVID_STATISTICS,
        selected_country_region: this.state.defaultCountryRegion,
        province_states: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  render = () => {
    return (
      <Draggable handle=".handle">
        <div className="container scatter-plot mt-3">
          <Handle title="Scatter Plot" />
          <div className="row">
            <div className="filter-panel col-3">
              <div>
                <SelectComponent
                  id="countryRegions"
                  optionValues={this.state.country_regions}
                  label="Country/Region"
                  selected={this.state.selected_country_region}
                  changeHandler={this.countryRegionChangedHandler}
                />

                {this.state.province_states.length > 0 ? (
                  <SelectComponent
                    id="provinceStates"
                    optionValues={this.state.province_states}
                    label="Province/State"
                    selected={this.state.selected_state_province}
                    changeHandler={this.stateProvinceChangedHandler}
                  />
                ) : null}
                <div className="row">
                  <div className="form-group col-12">
                    <input
                      type="checkbox"
                      id="confirmedCheckbox"
                      name="confirmedCheckbox"
                      value="Confirmed"
                      checked={this.state.showConfirmed}
                      onChange={this.tracesCheckboxHandler}
                    />
                    <label htmlFor="confirmedCheckbox">Confirmed</label>
                  </div>
                  <div className="form-group col-12">
                    <input
                      type="checkbox"
                      id="recoveredCheckbox"
                      name="recoveredCheckbox"
                      value="Recovered"
                      checked={this.state.showRecovered}
                      onChange={this.tracesCheckboxHandler}
                    />
                    <label htmlFor="recoveredCheckbox">Recovered</label>
                  </div>
                  <div className="form-group col-12">
                    <input
                      type="checkbox"
                      id="deathsCheckbox"
                      name="deathsCheckbox"
                      value="Deaths"
                      checked={this.state.showDeaths}
                      onChange={this.tracesCheckboxHandler}
                    />
                    <label htmlFor="deathsCheckbox">Deaths</label>
                  </div>
                </div>
                
              </div>

              {this.state.covidocs.length > 0 ? (
                <div>
                  <LegendBox />
                  <hr />
                  <ObservationPeriod covidocs={this.state.covidocs} />
                </div>
              ) : null}
              <hr/>
              <div className="mb-3">
                  <button
                    id="worldwideStatsButton"
                    className="btn-warning"
                    hidden={
                      this.state.plotHeader === WORLDWIDE_COVID_STATISTICS
                    }
                    onClick={this.worldwideStatsButtonHandler}
                  >
                    Worldwide Statistics
                  </button>
                </div>
            </div>
            <div className="col-9">
              {this.state.covidocs.length > 0 ? (
                <ScatterPlot
                  covidocs={this.state.covidocs}
                  plotHeader={this.state.plotHeader}
                  showConfirmed={this.state.showConfirmed}
                  showRecovered={this.state.showRecovered}
                  showDeaths={this.state.showDeaths}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Draggable>
    );
  };
}
