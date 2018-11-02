import React from "react";
import { Col, Row } from "../Grid";

const ForecastContainer = props => {
  let forecastList;
  if (props.currentLocation.forecast) {
    // Filter 3-hour forecasts down to one every 24 hours
    forecastList = props.currentLocation.forecast.list.filter((element, index) => {
      return index % 8 === 0;
    });

  // Create array for verbal names of days. Get tomorrow's date
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const date = new Date();
  const tomorrow = date.getDay() + 1;

    return (
      <Row className="justify-content-center mt-4">
        {forecastList.map((day, index) => (
          <Col key={index} size="lg-2" >
            <p className={"m-3 mx-lg-0 d-inline-block d-lg-block"}>
              {/* Use index to increment day names for forecast. If end of week is reached, start from beginning */}
              {(tomorrow + index) < 7 ? days[tomorrow + index] : days[tomorrow + index - 7]}
            </p>
            <p className={"m-3 mx-lg-0 d-inline-block d-lg-block"}>
              High: {props.convertTemp(day.main.temp_max)}
            </p>
            <p className={"m-3 mx-lg-0 d-inline-block d-lg-block"}>
              Low: {props.convertTemp(day.main.temp_min)}
            </p>
          </Col>
        ))}
      </Row>
    )
  } else {
    return null;
  }
}

export default ForecastContainer;