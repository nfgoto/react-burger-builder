import React, { Component } from 'react';

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import igType from "../../components/Burger/BurgerIngredients/ingredientTypes";

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
        totalPrice: 10
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

        // update total price of burger
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
    }
    
    removeIngredientHandler = (type) => {

    }

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />   
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;