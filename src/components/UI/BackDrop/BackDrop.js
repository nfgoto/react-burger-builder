import React from "react";

import classes from "./BackDrop.css";

// Backdrop is the semi opaque background element that lies behind the modal
const BackDrop = ({ show, clicked}) => {
    return show ? <div className={classes.BackDrop} onClick={clicked}></div> : null;
}

export default BackDrop;