import React, { Component } from "react";
import Plot from "react-plotly.js";
import Handle from "../Handle/Handle";

export default class ScatterPlot extends Component {
  prepareData = () => {
    const tracesData = [];
    const timeline = this.props.covidocs.map(
      (coviDoc) => coviDoc.observationDate,
    );

    const commonProps = {
      x: timeline,
      mode: "lines+markers",
      type: "scatter",
    };

    if (this.props.showConfirmed) {
      const confirmed = this.props.covidocs.map((coviDoc) => coviDoc.confirmed);

      tracesData.push({
        name: "Confirmed",
        y: confirmed,
        ...commonProps,
      });
    }

    if (this.props.showRecovered) {
      const recovered = this.props.covidocs.map((coviDoc) => coviDoc.recovered);

      tracesData.push({
        name: "Recovered",
        marker: { color: "green" },
        y: recovered,
        ...commonProps,
      });
    }

    if (this.props.showDeaths) {
      const deaths = this.props.covidocs.map((coviDoc) => coviDoc.deaths);

      tracesData.push({
        name: "Deaths",
        marker: { color: "red" },
        y: deaths,
        ...commonProps,
      });
    }

    return tracesData;
  };

  render = () => {
    const data = this.prepareData();
    const layout = { title: this.props.plotHeader };
    const config = { responsive: true };

    return (
      <div className="col-12">
        <Handle title="Scatter Plot" />
        <Plot data={data} layout={layout} style={{ width: "95%" }} config={config} />
      </div>
    );
  };
}
