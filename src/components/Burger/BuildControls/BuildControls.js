import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import ig from "../BurgerIngredients/ingredientTypes";

// types need to match the ones in burger ingredient
const controls = [
    {label: 'Salad', type: ig.SALAD},
    {label: 'Cheese', type: ig.CHEESE},
    {label: 'Meat', type: ig.MEAT},
    {label: 'Bacon', type: ig.BACON}
];

const BuildControls = ({ a }) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map( (control, idx) => {
                return (
                <div key={control.type + idx}>
                    <BuildControl label={control.label}/>
                </div>
            );
            })}
        </div>
    );
};

export default BuildControls;
