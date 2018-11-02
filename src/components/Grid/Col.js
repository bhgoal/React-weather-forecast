import React from "react";

export const Col = props => {

  const classes = props.className ? props.className + " " : "";

  return (
    <div className={classes + props.size.split(" ").map(size => "col-" + size).join(" ")}>
      {props.children}
    </div>
  )
}
