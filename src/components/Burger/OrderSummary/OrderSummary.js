import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../../components/UI/Button/Button";

const OrderSummary = ({ ingredients, totalPrice, purchaseContinued, purchaseCancelled }) => {

    const ingredientsSummary = Object.entries(ingredients);

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary.map( igArr => {
                        const [ igType, igCount ]= igArr;
                        return (
                        <li key={igType}>
                            <span style={{ textTransform: 'capitalize'}}>{igType}</span> : {igCount}
                        </li>);
                    })
                }
            </ul>
            <p><strong>Price : {totalPrice.toFixed(2)}</strong></p>
            <p>Continue To Checkout ?</p>
            <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
            <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
        </Aux>
    );
}

export default OrderSummary;