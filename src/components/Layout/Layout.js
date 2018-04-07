import React from "react";

import classes from "./Layout.css";
import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = ({ children }) => (
    <Aux>
        <Toolbar />
        <main className={classes.Content}>
            {children}
        </main>
    </Aux>
);

export default Layout;
