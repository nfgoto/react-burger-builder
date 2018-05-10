import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  // to have ingredients before rendering
  componentWillMount() {
    const { location } = this.props;

    // extracting query parameters:
    // location.search contains the '?' of the query parameters
    //  URLSearchParams instance (return iterator) gets rid of '?'
    const query = new URLSearchParams(location.search);
    const ingredients = {};
    let totalPrice = 0;

    for (let param of query.entries()) {
      param[0] !== "price"
        ? // param looks like ['salad', '1']
          // query params are strings, convert param 1 to get a number value
          (ingredients[param[0]] = Number(param[1])) // or +param[1] -> number
        : (totalPrice = param[1]);
    }
    console.log("Ingredients =", ingredients, " - Totalprice= ", totalPrice);
    this.setState({ ingredients, totalPrice });
  }

  handleCheckoutContinue = () => {
    const { history } = this.props;
    history.replace("/checkout/contact-data");
  };

  handleCheckoutCancel = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { ingredients, totalPrice } = this.state;

    return (
      <div>
        <CheckoutSummary
          ingredients={ ingredients }
          onCheckoutContinue={ this.handleCheckoutContinue }
          onCheckoutCancel={ this.handleCheckoutCancel }
        />
        {/* match.path used for building paths, similar to match.url */}
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData ingredients={ ingredients } totalPrice={ totalPrice  } {...props} />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
