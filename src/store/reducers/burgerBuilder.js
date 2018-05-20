import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

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

const addIngredient = (state, action) => {
  const updatedIngredients = updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  });
  return updatedIngredients;
};

const removeIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: --state.ingredients[action.ingredientName]
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  });
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 10,
    // in case there were an error previously
    error: false
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    default: return state;
  }
};

export default reducer;
