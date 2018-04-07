import React, { Component } from 'react';

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import igType from "../../components/Burger/BurgerIngredients/ingredientTypes";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    [igType.SALAD]: 0.5,
    [igType.CHEESE]: 0.8,
    [igType.MEAT]: 3.5,
    [igType.BACON]: 2
};

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);

    //     this.state = {}
    // }

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 10,
        purchaseable: false,
        purchasing: false
    }
    
    updatePurchaseState = (updatedIngredients) => {
        // sum up all values of ingredients
        const ingredientsCount = Object.values(updatedIngredients).reduce((acc, count) => {
            return acc += count;
        }, 0);
        console.log(ingredientsCount)
        this.setState({ purchaseable: (ingredientsCount > 0) });
    }

    addIngredientHandler = (type) => {
        // get old count of type of ingredient
        const oldCount = this.state.ingredients[type];
        // increment count
        const updatedCount = oldCount + 1;
        // create copy of current state
        const updatedIngredients = {
            ...this.state.ingredients
        }
        // update state of the ingredient type
        updatedIngredients[type] = updatedCount;

        // update total price of burger with price addition
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        // update total price of burger with price deduction
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    onPurchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        // to disable control button based on ingredient count
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary   ingredients={this.state.ingredients}
                                    totalPrice={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />   
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.onPurchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;