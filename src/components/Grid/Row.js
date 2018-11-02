import React from "react";

export const Row = props => {

  const classes = props.className ? props.className + " " : "";

  return (
    <div className={classes + `row${props.fluid ? "-fluid" : ""}`}>
      {props.children}
    </div>
  )
}