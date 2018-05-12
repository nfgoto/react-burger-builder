import React from "react";

import classes from "./Button.css";

const Button = ({ children, clicked, disabled, btnType }) => {

    return (
        // use an array for multiple CSS classes, that will be joined to form a string with the classes
        <button className={[classes.Button, classes[btnType]].join(' ')}
                onClick={clicked}
                disabled={disabled}>{ children }</button>
        );
}

export default Button;