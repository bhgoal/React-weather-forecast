import React from "react";
import "./ListItem.css";

const style = {

}

export const ListItem = props =>
  <li className="list-group-item text-left" style={style} onClick={() => props.changeLocation(props.index)}>
    {props.children}
  </li>;
