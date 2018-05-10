import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const CheckoutSummary = ({ ingredients, onCheckoutContinue, onCheckoutCancel }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We Hope You Enjoy Your Meal !</h1>
      <div style={{ width: "80%", margin: "auto" }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Success" clicked={onCheckoutContinue}>
        CONTINUE
      </Button>
      <Button btnType="Danger" clicked={onCheckoutCancel}>
        CANCEL
      </Button>
    </div>
  );
};

export default CheckoutSummary;
