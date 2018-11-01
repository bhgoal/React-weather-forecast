import React from "react";
import { Col, Row } from "../Grid";

const style = {
  background: "rgba(255, 255, 255, 0.7)",
  overflow: "auto",
  width: "100%",
  height: "50%"
};

const listStyle = {
  float: "left"
}

const ForecastContainer = props => {
  let forecastList;
  if (props.currentLocation.forecast) {
    forecastList = props.currentLocation.forecast.list.filter((element, index) => {
      return index % 8 === 0;
    });

    return (
      <div className="row justify-content-center">
        {forecastList.map(day => (
          <Col size="lg-2" style={listStyle}>
            <p>Date: {"hi"}</p>
            <p>High: {props.convertTemp(day.main.temp_max)}</p>
            <p>Low: {props.convertTemp(day.main.temp_min)}</p>
          </Col>
        ))}
      </div>
    )
  } else {
    return (
      <div>
        {props.children}
      </div>
    )
  }
}

export default ForecastContainer;