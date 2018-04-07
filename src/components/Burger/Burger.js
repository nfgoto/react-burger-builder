import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const Burger = ({ ingredients }) => {
    // retrieve ingredients from props
    let transformedIngredients = Object.keys(ingredients)
        .map(igKey => {
        // to create the given number of an ingredient
        // for each ingredient, create an array with ingredient number of elements
        // fill that array with ingredient number of elements (destructuring)
        // map on that array, for each index return ingredient JSX
        return [...Array(ingredients[igKey])].map((_, idx) => {
            return <BurgerIngredient key={igKey + idx} type={igKey} />;
        });
        })
        // get the total number of ingredients based on the length of the flattenned array
        // instead of adding length of sub array for each ingredient
        .reduce((acc, igArr) => {
            return [...acc, ...igArr];
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please Start Adding Ingredients !</p>
    }

    return (
        <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
            {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
