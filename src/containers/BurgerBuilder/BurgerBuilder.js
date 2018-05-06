import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import igType from "../../components/Burger/BurgerIngredient/ingredientTypes";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders.js";

const INGREDIENT_PRICES = {
  [igType.SALAD]: 0.5,
  [igType.CHEESE]: 0.8,
  [igType.MEAT]: 3.5,
  [igType.BACON]: 2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 10,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://react-burger-builder-cce1e.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({ error: true });
      });

    // because we fetch data from the server that the UI depends on
    // we need to verify that the data was fetch before render elements depending on that data
    // for example, show a spinner while the data is being fetched
  }

  updatePurchaseState = updatedIngredients => {
    // sum up all values of ingredients
    const ingredientsCount = Object.values(updatedIngredients).reduce(
      (acc, count) => {
        return (acc += count);
      },
      0
    );
    this.setState({ purchaseable: ingredientsCount > 0 });
  };

  addIngredientHandler = type => {
    // get old count of type of ingredient
    const oldCount = this.state.ingredients[type];
    // increment count
    const updatedCount = oldCount + 1;
    // create copy of current state
    const updatedIngredients = {
      ...this.state.ingredients
    };
    // update state of the ingredient type
    updatedIngredients[type] = updatedCount;

    // update total price of burger with price addition
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });

    // pass the most recent state to avoid delays
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    // update total price of burger with price deduction
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });

    this.updatePurchaseState(updatedIngredients);
  };

  onPurchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  onPurchaseContinueHandler = () => {
    //alert("Let's continue !");
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Florian GOTO",
        address: {
          street: "test street",
          zipCode: "65432",
          country: "France"
        },
        email: "testmail@test.co",
        deliveryMethod: "fastest"
      }
    };

    // contacting firebase, firebase routes end with .json
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  onPurchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
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
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.onPurchaseHandler}
          />
        </Aux>
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          purchaseContinued={this.onPurchaseContinueHandler}
          purchaseCancelled={this.onPurchaseCancelHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.onPurchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
