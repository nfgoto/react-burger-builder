import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null
};

const purchaseInit = (state, action) => {
  return updateObject(state, {
    // turn back to false after pevious purchase done
    purchased: false
  });
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {
    loading: false
  });
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = { id: action.newOrderId, ...action.orderData };
      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: [...state.orders, newOrder]
      });
}

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

const fetchOrderStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
}

const fetchOrderFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action) ;
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
    default: return state;
  }
};

export default order;
