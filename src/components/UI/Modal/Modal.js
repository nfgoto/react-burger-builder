import React, { Component } from "react";

import classes from "./Modal.css";
import BackDrop from "../BackDrop/BackDrop";
import Aux from "../../../hoc/Aux";

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        // to avoid unecessary rerendering
        // Update the modal when it is shown (when click on order)
        return nextProps.show !== this.props.show;
    }

    render(){
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={
                        //{visibility: (show ? '' : 'hidden')}
                        {
                            /* vh: viewport height, with -100will slide the modal off the screen */
                            transform : (this.props.show ? 'translateY(0)' : 'translateY(-100vh)'),
                            /* opacity 0 make the modal invisible */
                            opacity: this.props.show ? '1' : '0'
                        }
                    }>
                    { this.props.children }
                </div>
            </Aux>
        );
    }
};

export default Modal;
