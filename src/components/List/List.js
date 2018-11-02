import React from "react";

const style = {
  width: "100%"
};

export const List = ({ children }) => {
  return (
    <div className="list-overflow-container" style={style}>
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};
