import React from "react";

const TodayContainer = props => {
  let weatherMain;
  if (props.today.weather) {
    weatherMain = props.today.weather[0].main;
  }
  return (
    <div>
      <p>Today: {weatherMain}</p>
      {props.children}
    </div>
  )
}
export default TodayContainer;