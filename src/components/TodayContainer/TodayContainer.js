import React from "react";
import { Col, Row } from "../Grid";
import "./TodayContainer.css";

const TodayContainer = props => {
  const nightClass = props.night ? " night" : "";
  if (props.currentLocation.today) {
    const location = props.currentLocation.today;
    return (
      <Row className={"todayContainer" + nightClass}>
      <Col size="md-6" className={"text-left"}>
        <p className="location">{location.name}</p>
      </Col>
      <Col size="md-6" className={"text-left mt-4"}>
        <p className="ml-3">Weather: {location.weather[0].main}</p>
        <p className="ml-3">Temperature: {props.convertTemp(location.main.temp)}</p>
        <p className="ml-3">High: {props.convertTemp(location.main.temp_max)}</p>
        <p className="ml-3">Low: {props.convertTemp(location.main.temp_min)}</p>
      </Col>
      {props.children}
      </Row>
    )
  } else {
    return (
      <Row className={"todayContainer" + nightClass}>
        <Col size="md-6" className={"text-left"}>
          <p className="location">Hello.</p>
          <p style={{marginLeft: "2vw"}}>Enter a zipcode to check the weather.</p>
        </Col>
      </Row>
    )
  }
}
export default TodayContainer;