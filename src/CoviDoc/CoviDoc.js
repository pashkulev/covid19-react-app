import React from 'react';
import Plot from 'react-plotly.js';
import './CoviDoc.css';

const CoviDoc = (props) => {
    const coviDocs = props.covidocs;
    const data = prepareData(props, coviDocs);
    const layout = {title: props.plotHeader};

    return (
        <div className="CoviDoc">
            <Plot data={data} layout={layout} style={{ width: '100%', height: '100%' }}/>   
        </div>
    );
};

const prepareData = (props, coviDocs) => {
    const tracesData = [];
    const timeline = coviDocs.map(coviDoc => coviDoc.observationDate);

    if (props.showConfirmed) {
        const confirmed = coviDocs.map(coviDoc => coviDoc.confirmed);

        tracesData.push({
            name: "Confirmed",
            x: timeline,
            y: confirmed,
            mode: 'lines+markers',
            type: 'scatter'
        });
    }

    if (props.showRecovered) {
        const recovered = coviDocs.map(coviDoc => coviDoc.recovered);

        tracesData.push({
            name: "Recovered",
            marker: {color: "green"},
            x: timeline,
            y: recovered,
            mode: 'lines+markers',
            type: 'scatter'
        });
    }

    if (props.showDeaths) {
        const deaths = coviDocs.map(coviDoc => coviDoc.deaths);

        tracesData.push({
            name: "Deaths",
            marker: {color: "red"}, 
            x: timeline,
            y: deaths,
            mode: 'lines+markers',
            type: 'scatter'
        });
    }

    return tracesData;
}

export default CoviDoc;