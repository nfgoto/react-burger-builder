import React from "react";

import classes from "./Modal.css";


const Modal = ({ children, show }) => {
  return (
      <div className={classes.Modal}
            style={
                //{visibility: (show ? '' : 'hidden')}
                {
                    /* vh: viewport height, with -100will slide the modal off the screen */
                    transform : (show ? 'translateY(0)' : 'translateY(-100vh)'),
                    opacity: show ? '1' : '0'
                }
            }>
          { children }
      </div>
  );
};

export default Modal;
