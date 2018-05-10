import React, { Component } from "react";

import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders.js";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    loading: false
  };

  handleOrder = event => {
    event.stopPropagation();
    //event.preventDafault();
    // const { location } = this.props;
    //alert("Let's continue !");
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form onSubmit={e => this.handleOrder(e)}>
        <input
          className={classes.Input}
          autoComplete="cc-name"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          autoComplete="email"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          autoComplete="street-address"
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          autoComplete="postal-code"
          type="text"
          name="postal"
          placeholder="Your Postal Code"
        />
        <Button btnType="Success" clicked={e => this.handleOrder(e)}>
          ORDER
        </Button>
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
