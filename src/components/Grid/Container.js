import React from "react";

const containerStyle = {
  background: "rgba(255, 255, 255, 0.7)",
  position: "absolute",
  overflow: "auto",
  width: "80vw",
  height: "80vh",
  margin: "10vh 10vw"
};

export const Container = ({ fluid, children }) =>
  <div className={`container${fluid ? "-fluid" : ""}`} style={containerStyle}>
    {children}
  </div>;
