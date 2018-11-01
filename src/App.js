import axios from 'axios';
import React, { Component } from 'react';
import { Col, Row, Container } from "./components/Grid";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
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
    console.log(this.state.formZipcode);
    const baseURL = 
    axios.get
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
