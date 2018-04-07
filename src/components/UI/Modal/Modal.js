import React from "react";

import classes from "./Modal.css";
import BackDrop from "../BackDrop/BackDrop";
import Aux from "../../../hoc/Aux";

const Modal = ({ children, show, modalClosed }) => {
    return (
        <Aux>
            <BackDrop show={show} clicked={modalClosed} />
            <div className={classes.Modal}
                style={
                    //{visibility: (show ? '' : 'hidden')}
                    {
                        /* vh: viewport height, with -100will slide the modal off the screen */
                        transform : (show ? 'translateY(0)' : 'translateY(-100vh)'),
                        /* opacity 0 make the modal invisible */
                        opacity: show ? '1' : '0'
                    }
                }>
                { children }
            </div>
        </Aux>
  );
};

export default Modal;
