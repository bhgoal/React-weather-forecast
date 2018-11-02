import React from "react";
import "./List.css";

export const ListItem = props => {

  const nightClass = props.night ? " night" : "";

  return (
    <li className={"list-group-item text-left" + nightClass} onClick={props.onClick}>
      {props.children}
    </li>
  )
}
