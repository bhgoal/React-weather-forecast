import React from "react";

const ForecastContainer = props => {
  let forecastMain;
  if (props.forecast.list) {
    forecastMain = props.forecast.list[0].weather[0].main;
  }
  return (
    <div>
      <p>Tomorrow: {forecastMain}</p>
      {props.children}
    </div>
  )
}

export default ForecastContainer;