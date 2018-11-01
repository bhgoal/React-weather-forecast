import React from "react";

const TodayContainer = props => {
  let weather;
  if (props.currentLocation.today) {
    weather = props.currentLocation.today;

    return (
      <div>
        <p>Today:</p>
        <p>Weather: {weather.weather[0].main}</p>
        <p>Temperature: {props.convertTemp(weather.main.temp)}</p>
        <p>High: {props.convertTemp(weather.main.temp_max)}</p>
        <p>Low: {props.convertTemp(weather.main.temp_min)}</p>
        {props.children}
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
export default TodayContainer;