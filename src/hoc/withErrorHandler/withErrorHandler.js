import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  // anonymous class expression
  return class extends Component {
    state = {
      error: null
    };

    
    componentWillMount() {
      // to do the error handling BEFORE wrapped component is mounted
      
      // set an axios listener to listen for error
      
      // reference to have access to axios interceptors anywhere in the class
      this.requestInterceptor = axios.interceptors.request.use(req => {
        // clear current error when sending request
        this.setState({ error: null });
        // need to return req so that it can be sent
        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        // set error from Firebase server
        this.setState({ error: error });
      });
    }

    // to avoid code leak with multiple axios instances on different components
    // called when component no longer used
    componentWillUnmount(){
      // pass reference to axios interceptor to eject
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmHandler = () => {
        // to close modal
        this.setState({error: null});
    }
    render() {
      return (
        <Aux>
            <Modal  show={this.state.error}
                    modalClosed={this.errorConfirmHandler}>
                    {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
