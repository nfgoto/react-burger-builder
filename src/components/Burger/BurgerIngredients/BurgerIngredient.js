import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./BurgerIngredient.css";
import igType from "./ingredientTypes";

class BurgerIngredient extends Component {
  render() {
    // to get value of ingredient
    let ingredient = null;

    switch (this.props.type) {
      case igType.BREAD_BOTTOM:
        ingredient = <div className={classes.BreadBottom} />;
        break;

      case igType.BREAD_TOP:
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;

      case igType.MEAT:
        ingredient = <div className={classes.Meat} />;
        break;

      case igType.CHEESE:
        ingredient = <div className={classes.Cheese} />;
        break;

      case igType.SALAD:
        ingredient = <div className={classes.Salad} />;
        break;

      case igType.BACON:
        ingredient = <div className={classes.Bacon} />;
        break;

      default:
        ingredient = null;
        break;
    }

    return ingredient;
  }
}

// props validation
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
