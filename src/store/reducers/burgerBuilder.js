import * as actionTypes from "../actions/actionTypes";

import igType from "../../components/Burger/BurgerIngredient/ingredientTypes";

const INGREDIENT_PRICES = {
    [igType.SALAD]: 0.5,
    [igType.CHEESE]: 0.8,
    [igType.MEAT]: 3.5,
    [igType.BACON]: 2
  };

const initialState = {
  ingredients: null,
  totalPrice: 10,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return{
        ...state,
        ingredients: action.ingredients,
        totalPrice:10,
        // in case there were an error previously
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return{
        ...state,
        error: true
      };
    case actionTypes.ADD_INGREDIENT:
      // this is how to create a DEEP CLONE of an object
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
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
