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
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false
  };

  componentDidMount() {
    // because we fetch data from the server that the UI depends on
    // we need to verify that the data was fetch before render elements depending on that data
    // for example, show a spinner while the data is being fetched
    const { onInitIngredient } = this.props;
    onInitIngredient();
  }

  updatePurchaseState = updatedIngredients => {
    // sum up all values of ingredients
    const sum = Object.values(updatedIngredients).reduce((acc, count) => {
      return (acc += count);
    }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      return this.setState({
        purchasing: true
      });
    }
    this.props.onSetAuthRedirectPath("/checkout");
    this.props.history.push("/auth");
  };

  purchaseContinueHandler = () => {
    const { history } = this.props;

    this.props.onInitPurchase();
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

    let burger = this.props.error ? (
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
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );

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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: ingredientName =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemove: ingredientName =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
