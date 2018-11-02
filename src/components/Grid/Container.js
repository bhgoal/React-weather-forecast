import React from "react";

const containerStyle = {
  background: "rgba(255, 255, 255, 0.75)",
  position: "absolute",
  overflow: "auto",
  width: "100%",
  height: "80vh",
  margin: "10vh 10vw",
  marginLeft: "10vw",
  borderRadius: "0.5vw"
};

export const Container = ({ fluid, children }) =>
  <div className={`container${fluid ? "-fluid" : ""}`} style={containerStyle}>
    {children}
  </div>;
