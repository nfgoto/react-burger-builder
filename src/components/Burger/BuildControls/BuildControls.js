import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import ig from "../BurgerIngredient/ingredientTypes";

// types need to match the ones in burger ingredient
const controls = [
  { label: "Salad", type: ig.SALAD },
  { label: "Cheese", type: ig.CHEESE },
  { label: "Meat", type: ig.MEAT },
  { label: "Bacon", type: ig.BACON }
];

const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  price,
  purchaseable,
  ordered,
  isAuth
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>Current Price: {price.toFixed(2)}</strong>
      </p>
      {controls.map((control, idx) => {
        return (
          <div key={control.type + idx}>
            <BuildControl
              label={control.label}
              added={() => ingredientAdded(control.type)}
              removed={() => ingredientRemoved(control.type)}
              disabled={disabled[control.type]}
            />
          </div>
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!purchaseable}
        onClick={ordered}
      >
        {isAuth ? "ORDER NOW" : "SIGNUP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
