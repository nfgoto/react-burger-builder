import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  handleCheckoutContinue = () => {
    const { history } = this.props;
    history.replace("/checkout/contact-data");
  };

  handleCheckoutCancel = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { ings } = this.props;
    // allows to redirect automatically if reload page and then no ingredients
    let summary = <Redirect to="/" />;

    if (ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={ings}
            onCheckoutContinue={this.handleCheckoutContinue}
            onCheckoutCancel={this.handleCheckoutCancel}
          />
          {/* match.path used for building paths, similar to match.url */}
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    purchased: state.orderReducer.purchased
  };
};

// no dispatching of actions
export default connect(mapStateToProps)(Checkout);
