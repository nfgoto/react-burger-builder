import React from "react";

import Aux from "../../../hoc/Aux";

const OrderSummary = ({ ingredients, totalPrice }) => {

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
            <p>Price : {totalPrice.toFixed(2)}</p>
        </Aux>
    );
}

export default OrderSummary;