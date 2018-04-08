import React from "react";

import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../../hoc/Aux/Aux";

const SideDrawer = ({ link, active, closed, open, children }) => {
    let attachedClasses = [classes.SideDrawer, classes.Close ];
    
    // Is the side drawer open ?
    if (open) {
        // remove Close CSS class
        attachedClasses.pop();
        attachedClasses.push(classes.Open);
    }
    
    return (
        <Aux>
            <BackDrop show={open} clicked={closed}/>
            <div className={attachedClasses.join(' ')}>
            
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />    
                </nav>
            </div>
        </Aux>
    )};

export default SideDrawer;
