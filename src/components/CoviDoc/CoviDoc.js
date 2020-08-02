import React, { Component } from "react";
import Plot from "react-plotly.js";
import Draggable from "react-draggable";
import LegendBox from "../LegendBox/LegendBox";
import ObservationPeriod from "../ObservationPeriodBox/ObservationPeriodBox";
import DropdownComponent from "../Dropdown/Dropdown";
import CoviDocService from "../../services/CoviDocService";
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

  mouseOverPlotTitleHandler = () => {
    this.setState({ showMoveMeHint: true });
  };

  mouseOutOfPlotTitleHandler = () => {
    this.setState({ showMoveMeHint: false });
  };

  render = () => {
    const data = this.prepareData();
    const layout = { title: this.state.plotHeader };

    return (
      <Draggable handle=".handle">
        <div className="CoviDoc">
          <div>
            <div className="box no-cursor">
              <div
                className="handle"
                onMouseOver={this.mouseOverPlotTitleHandler}
                onMouseOut={this.mouseOutOfPlotTitleHandler}
              >
                {this.state.showMoveMeHint ? 'Move Me' : 'Covidocs Plot'}
              </div>
            </div>
            {this.state.covidocs.length > 0 ? (
              <Plot data={data} layout={layout} style={{ width: "95%" }} />
            ) : null}
            <hr/>
            <div className="filter-panel row">
              <div className="col-6 mb-3">
                <DropdownComponent
                  id="countryRegions"
                  optionValues={this.state.country_regions}
                  label="Country/Region"
                  selected={this.state.selected_country_region}
                  changeHandler={this.countryRegionChangedHandler}
                />

                {this.state.province_states.length > 0 ? (
                  <DropdownComponent
                    id="provinceStates"
                    optionValues={this.state.province_states}
                    label="Province/State"
                    selected={this.state.selected_state_province}
                    changeHandler={this.stateProvinceChangedHandler}
                  />
                ) : null}
                <div>
                  <input
                    type="checkbox"
                    id="confirmedCheckbox"
                    name="confirmedCheckbox"
                    value="Confirmed"
                    checked={this.state.showConfirmed}
                    onChange={this.tracesCheckboxHandler}
                  />
                  <label htmlFor="confirmedCheckbox">Confirmed</label>

                  <input
                    type="checkbox"
                    id="recoveredCheckbox"
                    name="recoveredCheckbox"
                    value="Recovered"
                    checked={this.state.showRecovered}
                    onChange={this.tracesCheckboxHandler}
                  />
                  <label htmlFor="recoveredCheckbox">Recovered</label>

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
                <div>
                  <button
                    id="worldwideStatsButton"
                    className="btn-warning"
                    hidden={this.state.plotHeader === WORLDWIDE_COVID_STATISTICS}
                    onClick={this.worldwideStatsButtonHandler}
                  >
                    See Worldwide Statistics
                  </button>
                </div>
              </div>

              {this.state.covidocs.length > 0 ? (
                <div className="col-6">
                  <LegendBox />
                  <hr />
                  <ObservationPeriod covidocs={this.state.covidocs} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Draggable>
    );
  };

  prepareData = () => {
    const tracesData = [];
    const timeline = this.state.covidocs.map(
      (coviDoc) => coviDoc.observationDate,
    );

    const commonProps = {
      x: timeline,
      mode: "lines+markers",
      type: "scatter",
    };

    if (this.state.showConfirmed) {
      const confirmed = this.state.covidocs.map((coviDoc) => coviDoc.confirmed);

      tracesData.push({
        name: "Confirmed",
        y: confirmed,
        ...commonProps,
      });
    }

    if (this.state.showRecovered) {
      const recovered = this.state.covidocs.map((coviDoc) => coviDoc.recovered);

      tracesData.push({
        name: "Recovered",
        marker: { color: "green" },
        y: recovered,
        ...commonProps,
      });
    }

    if (this.state.showDeaths) {
      const deaths = this.state.covidocs.map((coviDoc) => coviDoc.deaths);

      tracesData.push({
        name: "Deaths",
        marker: { color: "red" },
        y: deaths,
        ...commonProps,
      });
    }

    return tracesData;
  };
}
