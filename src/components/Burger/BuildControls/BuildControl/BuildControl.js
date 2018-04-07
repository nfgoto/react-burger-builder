import React from "react";

import classes from "./BuildControl.css";

const BuildControl = ({ label, added, removed }) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.More} onClick={added}>
        More
      </button>
      <button className={classes.Less} onClick={removed}>
        Less
      </button>
    </div>
  );
};

export default BuildControl;
