import React from 'react';
import Plot from 'react-plotly.js';
import './CoviDoc.css';

const CoviDoc = (props) => {
    const data = prepareData(props);
    const layout = {title: props.plotHeader};

    return (
        <div className="CoviDoc">
            <Plot data={data} layout={layout} style={{ width: '100%', height: '100%' }}/>   
        </div>
    );
};

const prepareData = (props) => {
    const tracesData = [];
    const timeline = props.covidocs.map(coviDoc => coviDoc.observationDate);

    const commonProps = {
        x: timeline,
        mode: 'lines+markers',
        type: 'scatter'
    }

    if (props.showConfirmed) {
        const confirmed = props.covidocs.map(coviDoc => coviDoc.confirmed);

        tracesData.push({
            name: "Confirmed",
            y: confirmed,
            ...commonProps
        });
    }

    if (props.showRecovered) {
        const recovered = props.covidocs.map(coviDoc => coviDoc.recovered);

        tracesData.push({
            name: "Recovered",
            marker: {color: "green"},
            y: recovered,
            ...commonProps
        });
    }

    if (props.showDeaths) {
        const deaths = props.covidocs.map(coviDoc => coviDoc.deaths);

        tracesData.push({
            name: "Deaths",
            marker: {color: "red"}, 
            y: deaths,
            ...commonProps
        });
    }

    return tracesData;
}

export default CoviDoc;