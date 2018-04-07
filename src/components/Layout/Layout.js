import React, { Component } from "react";

import classes from "./Layout.css";
import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        // do NOT this.state inside setState because it is async method: unpredictable outcome
        // instead use a function that takes previous state as input and returns the object to merge into the state
        // CLEAN WAY of setting the state when it depends on the older state
        this.setState((previousState) =>{
            return {showSideDrawer: !previousState.showSideDrawer}
        });
    }

    render(){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerHandler} />
                <SideDrawer open={this.state.showSideDrawer} 
                            closed={this.sideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

export default Layout;
