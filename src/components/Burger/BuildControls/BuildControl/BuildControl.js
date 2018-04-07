import React from "react";

import classes from "./BuildControl.css";

const BuildControl = ({ label, added, removed, disabled }) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.More} onClick={added}>
        More
      </button>
      <button className={classes.Less} onClick={removed} disabled={disabled}>
        Less
      </button>
    </div>
  );
};

export default BuildControl;
