import React from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const LegendBox = (props) => {
    return (
        <div>
            <hr/>
            <h4>Legend:</h4>
            <ul>
                <li>x-axis: Timeline</li>
                <li>y-axis: People Count</li>
            </ul>
            <hr/>
            {getObservationPeriodParagraph(props.covidocs)}
        </div>
    );
};

const getObservationPeriodParagraph = (covidocs) => {
    return (
        <p>
            <strong>Observation Period:</strong><br/> {formatDate(covidocs[0].observationDate)} - {formatDate(covidocs[covidocs.length - 1].observationDate)}
        </p>
    );
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();

    return day + " " + month + " " + year;
};

export default LegendBox;