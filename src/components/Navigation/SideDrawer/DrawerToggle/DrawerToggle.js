import React from "react";

import classes from "./DrawerToggle.css";

const Menu = ({clicked}) => {
    return (
        <div className={classes.DrawerToggle}
                onClick={clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Menu;