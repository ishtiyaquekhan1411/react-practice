import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to="/welcome">Welcome</NavLink>
                        {/* Same as Link but used if want to apply any CSS active link. */}
                    </li>
                    <li>
                        <NavLink activeClassName={classes.active} to="/products">Products</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader;