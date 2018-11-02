import React from "react";
import "./Container.css";

export const Container = props =>
  <div className={props.className}>
    {props.children}
  </div>;
