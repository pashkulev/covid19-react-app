import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import Draggable from 'react-draggable';
import './CoviDoc.css';

export default class CoviDoc extends Component {

    state = {
        showHint: false
    }

    mouseOverHandler = () => {
        this.setState({showHint: true});
    };

    mouseOutHandler = () => {
        this.setState({showHint: false});
    };
    
    render = () => {
        const data = this.prepareData(this.props);
        const layout = {title: this.props.plotHeader};

        return (
            <Draggable handle=".handle">
                <div className="CoviDoc text-center">
                    <div className="box no-cursor">
                        <div className="handle" onMouseOver={this.mouseOverHandler} onMouseOut={this.mouseOutHandler}>
                            {this.state.showHint ? <span>Move Me</span> : null}
                        </div>
                    </div>
                    <Plot data={data} layout={layout} style={{width: '75%'}}/>   
                </div>
            </Draggable>
        );
    };

    prepareData = (props) => {
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
}
