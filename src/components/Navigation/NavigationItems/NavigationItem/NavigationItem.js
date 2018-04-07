import React from "react";

import classes from "./NavigationItem.css";

const NavigationItem = ({ link, active, children }) => (
        /* active is a boolean property on props object */
        <li className={classes.NavigationItem}>
            <a href={link} className={active ? classes.active : null}>{ children }</a>
        </li>
    );

export default NavigationItem;
