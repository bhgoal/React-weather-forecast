import axios from 'axios';
import React, { Component } from 'react';
import { Col, Row, Container } from "./components/Grid";
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
    tempUnit: "°F",
    nightMode: false
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  validateInput = () => {
    
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.formZipcode) {
      this.runApiCall();
      this.setState({formZipcode: "Loading..."});
    }
  }

  runApiCall = () => {
    const baseURL = "https://api.openweathermap.org/data/2.5/";
    const queryParams = `?zip=${this.state.formZipcode}&APPID=da94383d867bc56261204d883151e83d`;
    axios.get(baseURL + "weather" + queryParams)
    .then(res => {
      const todayRes = res.data;
      axios.get(baseURL + "forecast" + queryParams)
      .then(res => {
        const forecastRes = res.data;
        this.handleApiData(todayRes, forecastRes);
        this.setState({formZipcode: ""});
      });
    }).catch(err => console.log(err));;
  }

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

  changeLocation = id => {
    this.setState({
      currentLocation: this.state.locations[id]
    });
  }

  convertTemp = temp => {
    let convertedTemp = temp - 273.15;
    if (this.state.tempUnit === "°F") {
      convertedTemp = 1.8 * convertedTemp + 32;
    }
    return Math.round(convertedTemp) + this.state.tempUnit;
  }

  nightToggle = () => {
    this.setState(prevState => ({
      nightMode: !prevState.nightMode
    }));
  }

  render() {

    const nightClass = this.state.nightMode ? " night" : "";

    return (
      <div className={"App" + nightClass}>
        <div className="background" style={{background: `url('${background}') center/cover`}} />
        <Container className={"container" + nightClass}>
          <Row>
            <Col size="lg-4">
              <form>
                <div className="form-group row mt-3">
                  <label className="col-auto col-form-label fas fa-search" />
                  <input type="text" className="col-6 form-control form-control-sm mr-2" 
                      onChange={this.handleInputChange}
                      name="formZipcode"
                      placeholder="Zipcode"
                      value={this.state.formZipcode} />
                  <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary btn-sm">Go</button>
                  <i className="far fa-moon ml-auto mr-3 nightToggle" style={{fontSize: "1.7rem", marginTop: ".2rem"}} onClick={this.nightToggle} />
                  
                </div>
              </form>
              <Row>
                <List>
                  {this.state.locations.map((location, index) => (
                    <ListItem key={location.today.name} location={location} changeLocation={this.changeLocation} index={index}>
                      {location.today.name}
                    </ListItem>
                  ))}
                </List>
              </Row>
            </Col>
            <Col size="lg-8">
              <Row>
              <TodayContainer currentLocation={this.state.currentLocation} convertTemp={this.convertTemp} />
              </Row>
                <ForecastContainer currentLocation={this.state.currentLocation} convertTemp={this.convertTemp} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
