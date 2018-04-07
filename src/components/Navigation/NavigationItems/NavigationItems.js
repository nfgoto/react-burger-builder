import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({ a }) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/alink" active>Burger Builder</NavigationItem>
        <NavigationItem link="/anotherlink">Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;
