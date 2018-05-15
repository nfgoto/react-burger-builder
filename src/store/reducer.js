import * as actionTypes from "./actions";

import igType from "../components/Burger/BurgerIngredient/ingredientTypes";

const INGREDIENT_PRICES = {
    [igType.SALAD]: 0.5,
    [igType.CHEESE]: 0.8,
    [igType.MEAT]: 3.5,
    [igType.BACON]: 2
  };

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0
  },
  totalPrice: 10
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      // this is how to create a DEEP CLONE of an object
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: ++state.ingredients[action.ingredientName]
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: --state.ingredients[action.ingredientName]
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

      };
    default:
      return state;
  }
};

export default reducer;
