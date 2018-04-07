 import React from "react";

// burgerLogo receives the path to image that Webpack will copy 
import burgerLogo from "../../assets/images/burger_logo.png";
import classes from "./Logo.css";

const Logo = ({ a }) => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="burger logo"/>
        </div>
    );
}

export default Logo;