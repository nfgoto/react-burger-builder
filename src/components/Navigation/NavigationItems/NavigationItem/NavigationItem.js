import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.css";

const NavigationItem = ({ link, active, exact, children }) => (
  /* to set the active CSS set the activeClassName to the active selectors in CSS because by using
    you will not get simple "active" class name but a BEM class name   */
  <li className={classes.NavigationItem}>
    <NavLink to={link} exact={exact} activeClassName={classes.active}>
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
