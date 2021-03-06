import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmail } from "validator";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions";
import { fieldBuilder } from "../helper";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";

class Auth extends Component {
  state = {
    controls: {
      email: fieldBuilder({
        elementType: "input",
        type: "email",
        autoComplete: "email",
        placeholder: "Your E-Mail",
        validation: { required: true, isEmail: true }
      }),
      password: fieldBuilder({
        elementType: "input",
        type: "password",
        autoComplete: "password",
        placeholder: "Password",
        validation: {
          required: true,
          minLength: 7
        }
      })
    },
    formIsValid: false,
    isSignup: true
  };

  componentDidMount() {
    const {
      buildingBurger,
      authRedirectPath,
      onSetAuthRedirectPath
    } = this.props;
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }

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

    if (rules.isEmail) {
      isValid = isEmail(value) && isValid;
    }

    return isValid;
  };

  handleChange = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    // to avoid the last checl setting the entire form validity, start at true
    let formIsValid = true;

    for (let formInputIdentifier in updatedControls) {
      // and check if each element is valid AND the entire form still true
      formIsValid = updatedControls[formInputIdentifier].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid });
  };

  submitHandler = event => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    const { onAuth } = this.props;
    onAuth(email.value, password.value, this.state.isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState(previousState => {
      return { isSignup: !previousState.isSignup };
    });
  };

  render() {
    const formElementsArray = [];

    // let's have an array with normalized pattern
    for (let fieldKey in this.state.controls) {
      formElementsArray.push({
        id: fieldKey,
        config: this.state.controls[fieldKey]
      });
    }

    let form = formElementsArray.map(fElm => {
      return (
        <Input
          key={fElm.id}
          elementType={fElm.config.elementType}
          elementConfig={fElm.config.elementConfig}
          value={fElm.config.value}
          changed={event => this.handleChange(event, fElm.id)}
          shouldValidate={fElm.config.validation}
          touched={fElm.config.touched}
          invalid={!fElm.config.valid}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      const { authRedirectPath } = this.props;
      console.log("[REDIRECT PATH]", authRedirectPath);
      authRedirect = <Redirect to={authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            {!this.state.isSignup ? "SIGN UP" : "SIGN IN"}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? "SIGN UP" : "SIGN IN"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
