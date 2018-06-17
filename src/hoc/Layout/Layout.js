import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerHandler = () => {
    // do NOT this.state inside setState because it is async method: unpredictable outcome
    // instead use a function that takes previous state as input and returns the object to merge into the state
    // CLEAN WAY of setting the state when it depends on the older state
    this.setState(previousState => {
      return { showSideDrawer: !previousState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
