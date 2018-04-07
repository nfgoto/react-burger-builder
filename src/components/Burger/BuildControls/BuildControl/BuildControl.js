import React from "react";

import classes from "./BuildControl.css";

const BuildControl = ({ label }) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{ label }</div>
            <button className={classes.More}>More</button>
            <button className={classes.Less}>Less</button>
        </div>
    );
};

export default BuildControl;
