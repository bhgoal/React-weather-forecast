import React from "react";

export const ListItem = props =>
  <li className="list-group-item" onClick={() => (props.changeLocation(props.id))}>
    {props.location.today.name}
  </li>;
