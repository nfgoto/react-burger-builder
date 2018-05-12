import React, { Component } from "react";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders.js";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const fieldBuilder = ({
  elementType = "",
  type = "",
  autoComplete = "",
  placeholder = "",
  value = "",
  options = [{ value: "", displayValue: "" }]
}) => {
  let elementConfig = null;

  switch (elementType) {
    case "input":
      elementConfig = {
        type,
        autoComplete,
        placeholder
      };
      break;

    case "select":
      elementConfig = {
        options
      };
      break;

    default:
      break;
  }
  return {
    elementType,
    elementConfig,
    value
  };
};

class ContactData extends Component {
  state = {
    orderForm: {
      name: fieldBuilder({
        elementType: "input",
        type: "text",
        autoComplete: "cc-name",
        placeholder: "Your Name"
      }),
      email: fieldBuilder({
        elementType: "input",
        type: "email",
        autoComplete: "email",
        placeholder: "Your E-Mail"
      }),
      street: fieldBuilder({
        elementType: "input",
        type: "text",
        autoComplete: "street-address",
        placeholder: "Your Street"
      }),
      zipCode: fieldBuilder({
        elementType: "input",
        type: "text",
        autoComplete: "postal-code",
        placeholder: "ZIP CODE"
      }),
      country: fieldBuilder({
        elementType: "input",
        type: "text",
        autoComplete: "country-name",
        placeholder: "Country"
      }),
      deliveryMethod: fieldBuilder({
        elementType: "select",
        options: [
          { value: "", displayValue: "Choose a Delivery Method" },
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      })
    },
    loading: false
  };

  componentDidMount() {
    console.log(this.state.orderForm);
  }

  handleOrder = event => {
    event.stopPropagation();
    //event.preventDafault();
    // const { location } = this.props;
    //alert("Let's continue !");
    this.setState({ loading: true });

    let formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    // contacting firebase, firebase routes end with .json
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  handleChange = (event, inputIdentifier) => {
    // avoid using target.currentValue because it is null at the beginning
    const updatedFieldValue = event.target.value;

    const updatedOrderForm = {
      // spread operator does NOT create a deep clone
      // which means that sub objects (like elementConfig) will point to original state
      ...this.state.orderForm
    };

    // to deep copy the state, we spread the sub object of interest too
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    // no longer points to original state
    updatedFormElement.value = updatedFieldValue;

    // on the shallow copy, we replace the reference by a copy of the sub object
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({ orderForm: updatedOrderForm });
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
      <form onSubmit={e => this.handleOrder(e)}>
        {formElementsArray.map(frmElm => {
          return (
            <Input
              key={frmElm.id}
              elementType={frmElm.config.elementType}
              elementConfig={frmElm.config.elementConfig}
              value={frmElm.config.value}
              changed={event => this.handleChange(event, frmElm.id)}
            />
          );
        })}
        <Button btnType="Success">ORDER</Button>
      </form>
    );

    if (this.state.loading) {
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

export default ContactData;
