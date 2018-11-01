import React from "react";
import { List, ListItem } from "../List";

const ForecastContainer = props => {
  let forecastList;
  if (props.currentLocation.forecast) {
    forecastList = props.currentLocation.forecast.list.filter((element, index) => {
      return index % 8 === 0;
    });

    return (
      <List>
        {forecastList.map(day => (
          <ListItem>
            <p>Date: {day.dt_txt}</p>
            <p>High: {props.convertTemp(day.main.temp_max)}</p>
            <p>Low: {props.convertTemp(day.main.temp_min)}</p>
          </ListItem>
        ))}
      </List>
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