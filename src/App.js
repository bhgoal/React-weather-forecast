import axios from 'axios';
import React, { Component } from 'react';
import { Col, Row } from "./components/Grid";
import TodayContainer from "./components/TodayContainer";
import ForecastContainer from "./components/ForecastContainer";
import { List, ListItem } from "./components/List";
import background from './background.jpg';
import './App.css';

class App extends Component {
  state = {
    locations: [],
    currentLocation: {},
    formZipcode: "",
    formError: "",
    tempUnit: "°F",
    night: false
  }

  // Capture form input into state
  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
      formError: ""
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const zipInput = this.state.formZipcode.trim();
    // Validate zipcode entry
    if ((zipInput.length === 5) && (!isNaN(zipInput))) {
      this.setState({formZipcode: "Loading..."});
      const baseURL = "https://api.openweathermap.org/data/2.5/";
        const queryParams = `?zip=${this.state.formZipcode}&APPID=da94383d867bc56261204d883151e83d`;
        // Make call to current weather API
        axios.get(baseURL + "weather" + queryParams)
        .then(res => {
          const todayRes = res.data;
          // Make call to 5-day forecast API
          axios.get(baseURL + "forecast" + queryParams)
          .then(res => {
            const forecastRes = res.data;
            // Pass along responses to be saved
            this.handleApiData(todayRes, forecastRes);
            this.setState({formZipcode: ""});
          });
        }).catch(err => {
            // If zipcode does not resolve to a city, display error message
            let errMessage = err.response.data.message;
            errMessage = errMessage.charAt(0).toUpperCase() + errMessage.slice(1);
            this.setState({
              formError: errMessage,
              formZipcode: zipInput
            });
            console.log(err.response);
          });
    } else {
      // Show message for wrong zipcode format
      this.setState({formError: "Invalid Zipcode"});
      console.log("invalid zip");
    }
  }

  // Add new search to list of locations
  handleApiData = (todayRes, forecastRes) => {
    let locations = this.state.locations;
    const newLocation = {
      today: todayRes,
      forecast: forecastRes
    }
    locations.push(newLocation);
    this.setState({locations: locations});
    this.changeLocation(locations.length - 1);
  }

  // Method to change the currently displayed location
  changeLocation = id => {
    this.setState({
      currentLocation: this.state.locations[id]
    });
  }

  // Method to convert between °C and °F
  convertTemp = temp => {
    let convertedTemp = temp - 273.15;
    if (this.state.tempUnit === "°F") {
      convertedTemp = 1.8 * convertedTemp + 32;
    }
    return Math.round(convertedTemp) + this.state.tempUnit;
  }

  // Toggle units between °C and °F
  unitToggle = () => {
    this.setState(prevState => ({
      tempUnit: prevState.tempUnit === "°F" ? "°C" : "°F"
    }))
  }

  // Toggle night mode on/off
  nightToggle = () => {
    this.setState(prevState => ({
      night: !prevState.night
    }));
  } 

  render() {

    // Conditional night CSS class
    const nightClass = this.state.night ? " night" : "";

    return (
      <div>
        <div className="background" style={{background: `url('${background}') center/cover`}} />
        <div className={"container" + nightClass}>
          <Row>
            <Col size="lg-4">           
              <Row className="mb-3 mt-3">
                {/* Zip input form */}
                <form className="form-inline">
                  <label htmlFor="formZipcode" className="col-auto col-form-label fas fa-search" />
                  <input
                    type="text" 
                    className={"col-6 form-control form-control-sm mr-2" + nightClass} 
                    onChange={this.handleInputChange}
                    id="formZipcode"
                    placeholder="Zipcode"
                    value={this.state.formZipcode}
                  />
                  <button 
                    onClick={this.handleFormSubmit}
                    type="submit" 
                    className={"btn btn-primary btn-sm" + nightClass}
                  >Go</button>
                </form>
                {/* Night mode toggle */}
                <i 
                  className={"far fa-moon ml-auto mr-3 nightToggleBtn" + nightClass} 
                  onClick={this.nightToggle} 
                /><p className="formError">{this.state.formError}</p>
              </Row>            
              <Row>
                {/* List of entered zipcodes */}
                <List>
                  {this.state.locations.map((location, index) => (
                    <ListItem 
                      key={location.today.name}
                      night={this.state.night}
                      onClick={() => this.changeLocation(index)}
                    >
                      {location.today.name}
                    </ListItem>
                  ))}
                </List>
              </Row>
            </Col>
            <Col size="lg-8">
              <TodayContainer 
                currentLocation={this.state.currentLocation}
                convertTemp={this.convertTemp} 
                night={this.state.night}
              >
                {/* Temp units toggle */}
                <button 
                  onClick={this.unitToggle}
                  type="button"
                  className={"btn btn-primary btn-sm unitToggleBtn" + nightClass}
                >°C / °F</button>
              </TodayContainer>
              <ForecastContainer 
                currentLocation={this.state.currentLocation}
                convertTemp={this.convertTemp} 
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
