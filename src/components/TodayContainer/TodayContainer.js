import React from "react";
import { Col, Row } from "../Grid";

const containerStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  overflow: "auto",
  width: "100%",
  height: "40vh",
  borderRadius: "0.5vw"
};

const locationStyle = {
  marginLeft: "2vw",
  fontSize: "5vw"
}

const TodayContainer = props => {
  let location;
  if (props.currentLocation.today) {
    location = props.currentLocation.today;

    return (
      <div style={containerStyle}>
        <Row>
        <Col size="md-6" className={"text-left"}>
          <p style={locationStyle}>{location.name}</p>
        </Col>
        <Col size="md-6" className={"text-left mt-4"}>
          <p>Weather: {location.weather[0].main}</p>
          <p>Temperature: {props.convertTemp(location.main.temp)}</p>
          <p>High: {props.convertTemp(location.main.temp_max)}</p>
          <p>Low: {props.convertTemp(location.main.temp_min)}</p>
        </Col>
        {props.children}
        </Row>
      </div>
    )
  } else {
    return (
      <div style={containerStyle}>
        <Row>
          <Col size="md-6" className={"text-left"}>
            <p style={locationStyle}>Hello.</p>
            <p style={{marginLeft: "2vw"}}>Enter a zipcode to check the weather.</p>
          </Col>
        </Row>
      </div>
    )
  }
}
export default TodayContainer;