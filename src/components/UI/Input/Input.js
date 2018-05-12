import React from "react";

import classes from "./Input.css";

const Input = props => {
  let inputElement = null;
  const inputClasses = [
    classes.InputElement,
    props.shouldValidate && props.touched && props.invalid
      ? classes.Invalid
      : ""
  ].join(" ");

  switch (props.elementType) {
    case "input":
      // distribute the wanted props on the input via destructuring of props object
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      // distribute the wanted props on the input via destructuring of props object
      inputElement = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
