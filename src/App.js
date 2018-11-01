import axios from 'axios';
import React, { Component } from 'react';
import { Col, Row, Container } from "./components/Grid";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    weather: {},
    forecast: {},
    formZipcode: ""
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
      this.runApiCall("weather");
      this.runApiCall("forecast");
    }
  }

  runApiCall = apiType => {
    const baseURL = "http://api.openweathermap.org/data/2.5/";
    const queryParams = `?zip=${this.state.formZipcode}&APPID=da94383d867bc56261204d883151e83d`;
    const queryURL = baseURL + apiType + queryParams;
    axios.get(queryURL)
      .then(res => 
      this.setState({
        [apiType]: res.data
      }));
  }

  render() {
    return (
      <div className="App">
        <Container fluid="true">
          <img src={logo} className="App-logo" alt="logo" />
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
        </Container>
      </div>
    );
  }
}

export default App;
