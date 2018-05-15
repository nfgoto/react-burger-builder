import React, { Component } from "react";
//import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders.js";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    /*  axios
      .get("https://react-burger-builder-cce1e.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({ error: true });
      }); */
    // because we fetch data from the server that the UI depends on
    // we need to verify that the data was fetch before render elements depending on that data
    // for example, show a spinner while the data is being fetched
  }

  updatePurchaseState = updatedIngredients => {
    // sum up all values of ingredients
    const sum = Object.values(updatedIngredients).reduce((acc, count) => {
      return (acc += count);
    }, 0);
    return sum > 0;
  };

  onPurchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseContinueHandler = () => {
    const { history } = this.props;
    history.push("/checkout");
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    // to disable control button based on ingredient count
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded</p>
    ) : (
      <Spinner />
    );

    // displaying burer only after data fetched from server
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdd}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.onPurchaseHandler}
          />
        </Aux>
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.price}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: ingredientName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemove: ingredientName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
