import React from "react";
import { Col, Row } from "../Grid";
import "./ForecastContainer.css";

const ForecastContainer = props => {
  let forecastList;
  if (props.currentLocation.forecast) {
    forecastList = props.currentLocation.forecast.list.filter((element, index) => {
      return index % 8 === 0;
    });

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date();
  const tomorrow = date.getDay() + 1;

    return (
      <div className="row justify-content-center mt-4">
        {forecastList.map((day, index) => (
          <Col size="lg-2" >
            <p className={"m-3 d-inline d-lg-block"}>{(tomorrow + index) < 7 ? days[tomorrow + index] : days[tomorrow + index - 7]}</p>
            <p className={"m-3 d-inline d-lg-block"}>High: {props.convertTemp(day.main.temp_max)}</p>
            <p className={"m-3 d-inline d-lg-block"}>Low: {props.convertTemp(day.main.temp_min)}</p>
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