import React, { Component } from "react";
import Plot from "react-plotly.js";
import Draggable from "react-draggable";
import Pagination from "react-js-pagination";
import Handle from "../Handle/Handle";
import CoviDocService from "../../../services/CoviDocService";

const PAGE_SIZE = 10;
const STATS_COLORS = {
  confirmed: "navy-blue",
  recovered: "green",
  deaths: "red",
};

export default class BarPlot extends Component {
  state = {
    coutryRegionData: [],
    pageNumber: 1,
    totalPages: 0,
    selectedStatistic: "confirmed",
  };

  componentDidMount = async () => {
    try {
      const countryRegionData = await CoviDocService.getAggregatedCountryRegionData();

      this.setState({
        coutryRegionData: countryRegionData,
        totalPages: countryRegionData.length / PAGE_SIZE,
      });
    } catch (error) {
      console.log(error);
    }
  };

  selectedStatisticChangedHandler = (event) => {
    const selection = event.target.value;
    this.setState({ selectedStatistic: selection });
  };

  pageChangedHandler = (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
  };

  prepareData = () => {
    const startIndex = this.state.pageNumber * 10 - 10;
    const endIndex = startIndex + 10;
    const pageResults = this.state.coutryRegionData.slice(startIndex, endIndex);

    return [
      {
        x: pageResults.map((e) => e[this.state.selectedStatistic]).reverse(),
        y: pageResults
          .map((e) => e["country_region"].substring(0, 10) + " ")
          .reverse(),
        marker: { color: STATS_COLORS[this.state.selectedStatistic] },
        type: "bar",
        orientation: "h",
      },
    ];
  };

  render = () => {
    const data = this.prepareData();
    const layout = {
      title: "Country/Region total " + this.state.selectedStatistic,
      showlegend: false,
    };
    const config = { responsive: true };

    return (
      <Draggable handle=".handle">
        <div className="container">
          <div className="row mt-3">
            <div className="col-12">
              <Handle title="Bar Plot" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 navigation-panel d-flex justify-content-between">
              
              <div className="form-inline">
                <div className="form-group">
                  <input
                    id="confirmedRadioButton"
                    name="selectedStatistic"
                    type="radio"
                    value="confirmed"
                    onChange={this.selectedStatisticChangedHandler}
                    checked={this.state.selectedStatistic === "confirmed"}
                  />
                  <label htmlFor="confirmedRadioButton">Confirmed</label>
                </div>
                <div className="form-group">
                  <input
                    id="recoveredRadioButton"
                    name="selectedStatistic"
                    type="radio"
                    value="recovered"
                    onChange={this.selectedStatisticChangedHandler}
                    checked={this.state.selectedStatistic === "recovered"}
                  />
                  <label htmlFor="recoveredRadioButton">Recovered</label>
                </div>
                <div className="form-group">
                  <input
                    id="deathsRadioButton"
                    name="selectedStatistic"
                    type="radio"
                    value="deaths"
                    onChange={this.selectedStatisticChangedHandler}
                    checked={this.state.selectedStatistic === "deaths"}
                  />
                  <label htmlFor="deathsRadioButton">Deaths</label>
                </div>
              </div>
              <div>
                <Pagination
                  prevPageText="Prev"
                  nextPageText="Next"
                  firstPageText="First"
                  lastPageText="Last"
                  activePage={this.state.pageNumber}
                  itemsCountPerPage={PAGE_SIZE}
                  totalItemsCount={this.state.coutryRegionData.length}
                  itemClass="page-item"
                  linkClass="page-link"
                  onChange={this.pageChangedHandler}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Plot
                data={data}
                layout={layout}
                config={config}
                style={{ width: "100%"}}
              />
            </div>
          </div>
        </div>
      </Draggable>
    );
  };
}
