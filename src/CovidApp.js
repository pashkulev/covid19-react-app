import React, { Component } from 'react';
import CoviDoc from './CoviDoc/CoviDoc';
import LegendBox from './LegendBox/LegendBox';
import Footer from './components/Footer';
import './CovidApp.css';

const WORLDWIDE_COVID_STATISTICS = "Worldwide Covid Statistics";

class CovidApp extends Component {
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
    showDeaths: true
  };

  componentDidMount() {
    fetch("http://localhost:3001/country-region")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            country_regions: result,
            province_states: [],
            defaultCountryRegion: result[0]
          });
        });
    this.worldwideStatsButtonHandler();
  }

  countryRegionChangedHandler = (event) => {
    const countryRegion = event.target.value;
    fetch("http://localhost:3001/province-state?country_region=" + countryRegion)
      .then(res => res.json())
      .then(provinceStates => {
        fetch("http://localhost:3001/country-region-stats?name=" + countryRegion)
            .then(res => res.json())
            .then(result => {
              const newState = {
                selected_country_region: countryRegion,
                covidocs: result,
                plotHeader: 'Covid Statistics for ' + countryRegion,
                selected_state_province: "",
                province_states: provinceStates.length !== 0 ? provinceStates : []
              };

              this.setState(newState);
            }).catch(error => console.log(error)); 
        
      }).catch(error => {
        console.log(error);
      });
  };

  stateProvinceChangedHandler = (event) => {
    const provinceState = event.target.value;
    fetch("http://localhost:3001/covidocs?country_region=" + this.state.selected_country_region + "&province_state=" + provinceState)
      .then(res => res.json())
      .then(covidocs => {
        this.setState({
          selected_state_province: provinceState,
          covidocs: covidocs,
          plotHeader: 'Covid Statistics for ' + this.state.selected_country_region + " (" + provinceState + ")"
        });
      }).catch(error => {
        console.log(error);
      });
  };

  tracesCheckboxHandler = (event) => {
    switch (event.target.value) {
      case "Confirmed": this.setState({showConfirmed: !this.state.showConfirmed}); break;
      case "Recovered": this.setState({showRecovered: !this.state.showRecovered}); break;
      case "Deaths": this.setState({showDeaths: !this.state.showDeaths}); break;
      default: break;
    }
  };

  worldwideStatsButtonHandler = () => {
    fetch("http://localhost:3001/worldwide-stats")
      .then(res => res.json())
      .then(result => {
        this.setState({
          covidocs: result,
          plotHeader: WORLDWIDE_COVID_STATISTICS,
          selected_country_region: this.state.defaultCountryRegion,
          province_states: []
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const countryRegions = this.state.country_regions.map((e, index) => <option key={index} value={e}>{e}</option>);
    const stateProvinces = this.state.province_states.map((e, index) => <option key={index} value={e}>{e}</option>);

    return (
      <div className="CovidApp container-fluid">
        <div class="row">
          <h1 className="col-12 header">Covid-19 Statistics App</h1>
        </div>   
        <div className="row p-3 content">
          <div className="col-3 filter-panel">
            {this.state.plotHeader !== WORLDWIDE_COVID_STATISTICS ? (
              <div>
                <button id="worldwideStatsButton" className="btn-warning w-100 mb-2" onClick={this.worldwideStatsButtonHandler}>See Worldwide Statistics</button>
              </div>) : null
            }
            <div className="form-group">
              <label>Filter by Country/Region:</label>
              <select 
                name="countryRegions" 
                id="countryRegions" 
                className="form-control" 
                value={this.state.selected_country_region}
                onChange={this.countryRegionChangedHandler}>
                {countryRegions}
              </select>
            </div>
            {this.state.province_states.length > 0 ? (
              <div className="form-group">
                <label>Filter by Province/State:</label>
                <select 
                  name="provinceStates" 
                  id="provinceStates" 
                  className="form-control"
                  value={this.state.selected_state_province}
                  onChange={this.stateProvinceChangedHandler}>
                  {stateProvinces}
                </select>
              </div>
            ) : null}
            <div className="form-group">
              <input 
                type="checkbox" 
                id="confirmedCheckbox" 
                name="confirmedCheckbox" 
                value="Confirmed" 
                checked={this.state.showConfirmed}
                onChange={this.tracesCheckboxHandler}/>
              <label htmlFor="confirmedCheckbox">Confirmed</label>
            </div>
            <div className="form-group">
              <input 
                type="checkbox" 
                id="recoveredCheckbox"
                name="recoveredCheckbox" 
                value="Recovered" 
                checked={this.state.showRecovered}
                onChange={this.tracesCheckboxHandler}/>
              <label htmlFor="recoveredCheckbox">Recovered</label>
            </div>
            <div className="form-group">
              <input 
                type="checkbox" 
                id="deathsCheckbox" 
                name="deathsCheckbox" 
                value="Deaths" 
                checked={this.state.showDeaths}
                onChange={this.tracesCheckboxHandler}/>
              <label htmlFor="deathsCheckbox">Deaths</label>
            </div>
            {this.state.covidocs.length > 0 ? (<LegendBox covidocs={this.state.covidocs}/>) : null}     
          </div>
          <div className="col-9">
              {this.state.covidocs.length > 0 
                ? <CoviDoc 
                    covidocs={this.state.covidocs} 
                    showConfirmed={this.state.showConfirmed}
                    showRecovered={this.state.showRecovered}
                    showDeaths={this.state.showDeaths}
                    plotHeader={this.state.plotHeader}/> 
                : null}
          </div>
        </div>   
        <Footer/>
      </div>
    );
  }
}

export default CovidApp;
