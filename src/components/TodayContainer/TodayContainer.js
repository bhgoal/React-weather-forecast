import React from "react";

const style = {
  background: "rgba(255, 255, 255, 0.7)",
  overflow: "auto",
  width: "100%",
  height: "40vh"
};

const TodayContainer = props => {
  let weather;
  if (props.currentLocation.today) {
    weather = props.currentLocation.today;

    return (
      <div style={style}>
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
      <div style={style}>
        {props.children}
      </div>
    )
  }
}
export default TodayContainer;