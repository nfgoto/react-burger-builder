import React from "react";

import classes from "./Layout.css";
import Aux from "../../hoc/Aux";

const Layout = ({ children }) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {children}
        </main>
    </Aux>
);

export default Layout;
