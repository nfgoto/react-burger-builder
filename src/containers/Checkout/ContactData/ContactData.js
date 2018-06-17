import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders.js";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/";
import { fieldBuilder } from "../../helper";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component {
  state = {
    orderForm: {
      name: fieldBuilder({
        elementType: "input",
        type: "text",
        autoComplete: "cc-name",
        placeholder: "Your Name",
        validation: { required: true }
      }),
      email: fieldBuilder({
        elementType: "input",
        type: "email",
        autoComplete: "email",
        placeholder: "Your E-Mail",
        validation: { required: true }
      }),
      street: fieldBuilder({
        elementType: "input",
        type: "text",
        autoComplete: "street-address",
        placeholder: "Your Street",
        validation: { required: true }
      }),
      zipCode: fieldBuilder({
        elementType: "input",
        type: "text",
        autoComplete: "postal-code",
        placeholder: "ZIP CODE",
        validation: { required: true, minLength: 5, maxLength: 5 }
      }),
      country: fieldBuilder({
        elementType: "input",
        type: "text",
        autoComplete: "country-name",
        placeholder: "Country",
        validation: { required: true }
      }),
      deliveryMethod: fieldBuilder({
        elementType: "select",
        options: [
          { value: "", displayValue: "Choose a Delivery Method" },
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ],
        // value by default if no option chosen
        validation: { required: true }
      })
    },
    formIsValid: false
  };

  checkValidity = (value = "", rules) => {
    // set to true by default to have cumulative effect for all rules they must ALL by valid to return true
    let isValid = true;

    // case where no validation
    if (!rules) {
      return true;
    }

    if (rules.required) {
      // add && isValid to make sure that all field validations add up together, otherwise only the last will prevail
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  handleOrder = event => {
    event.preventDefault(); //event.stopPropagation();
    const { onOrderBurger, token, userId } = this.props;
    let formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId
    };

    onOrderBurger(order, token);
  };

  handleChange = (event, inputIdentifier) => {
    // avoid using target.currentValue because it is null at the beginning
    const updatedFieldValue = event.target.value;

    const updatedOrderForm = {
      // spread operator does NOT create a deep clone
      // which means that sub objects (like elementConfig) will point to original state
      ...this.state.orderForm
    };

    // to deep copy the state, we spread the sub object of interest too and mark field as touched
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
      touched: true
    };

    // no longer points to original state
    updatedFormElement.value = updatedFieldValue;

    // checking validity of field value
    if (updatedFormElement.validation) {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }

    // on the shallow copy, we replace the reference by a copy of the sub object
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    // to avoid the last checl setting the entire form validity, start at true
    let formIsValid = true;

    for (let formInputIdentifier in updatedOrderForm) {
      // and check if each element is valid AND the entire form still true
      formIsValid = updatedOrderForm[formInputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formElementsArray = [];

    // let's have an array with normalized pattern
    for (let fieldKey in this.state.orderForm) {
      formElementsArray.push({
        id: fieldKey,
        config: this.state.orderForm[fieldKey]
      });
    }
    let form = (
      <form onSubmit={this.handleOrder}>
        {formElementsArray.map(frmElm => {
          return (
            <Input
              key={frmElm.id}
              elementType={frmElm.config.elementType}
              elementConfig={frmElm.config.elementConfig}
              value={frmElm.config.value}
              changed={event => this.handleChange(event, frmElm.id)}
              shouldValidate={frmElm.config.validation}
              touched={frmElm.config.touched}
              invalid={!frmElm.config.valid}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data:</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);
