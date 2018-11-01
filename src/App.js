import axios from 'axios';
import React, { Component } from 'react';
import { Col, Row, Container } from "./components/Grid";
import TodayContainer from "./components/TodayContainer";
import ForecastContainer from "./components/ForecastContainer";
import { List, ListItem } from "./components/List";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    locations: [],
    currentLocation: {},
    formZipcode: "",
    tempUnit: "°F"
  }

  componentDidMount() {
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.formZipcode) {
      console.log(this.state.formZipcode);
      this.runApiCall();
    }
  }

  runApiCall = () => {
    const baseURL = "http://api.openweathermap.org/data/2.5/";
    const queryParams = `?zip=${this.state.formZipcode}&APPID=da94383d867bc56261204d883151e83d`;
    axios.get(baseURL + "weather" + queryParams)
    .then(res => {
      const todayRes = res.data;
      axios.get(baseURL + "forecast" + queryParams)
      .then(res => {
        const forecastRes = res.data;
        this.handleApiData(todayRes, forecastRes);
      });
    });
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

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col size="md-4">
              <Row>
                <form>
                  <div className="form-group">
                    <label>Enter zipcode</label>
                    <input 
                      className="form-control" 
                      onChange={this.handleInputChange}
                      name="formZipcode"
                      placeholder="zipcode" 
                    />
                  </div>
                  <button onClick={this.handleFormSubmit} type="submit" className="btn btn-danger">Submit</button>
                </form>
              </Row>
              <Row>
                <List>
                  {this.state.locations.map((location, index) => (
                    <ListItem location={location} onClick={() => (this.changeLocation(index))}>
                      {location.today.name}
                    </ListItem>
                  ))}
                </List>
              </Row>
            </Col>
            <Col size="md-8">
              <Row>
              <TodayContainer currentLocation={this.state.currentLocation} convertTemp={this.convertTemp} />
              </Row>
              <Row>
                <ForecastContainer currentLocation={this.state.currentLocation} convertTemp={this.convertTemp} />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
