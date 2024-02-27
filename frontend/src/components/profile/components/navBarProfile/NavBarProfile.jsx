import classes from "./navBarProfile.module.css"
import {Link} from "react-router-dom";
import { FaUser } from "react-icons/fa";
import {IoBookmark, IoWalletSharp} from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import classNames from "classnames";

function NavBarProfile() {
    return (
        <nav className={classes.navBarProfile}>
            <Link to="/" className={classNames(classes.navBarBt, classes.activeBt)}>
                <FaUser className={classes.navBarBtSVG}/>
                <span>Профиль</span>
            </Link>
            <Link to="/" className={classes.navBarBt}>
                <IoBookmark className={classes.navBarBtSVG}/>
                <span>Избранное</span>
            </Link>
            <Link to="/" className={classes.navBarBt}>
                <IoWalletSharp className={classes.navBarBtSVG}/>
                <span>Личный счет</span>
            </Link>
            <Link to="/" className={classes.navBarBt}>
                <MdLogout className={classes.navBarBtSVG}/>
                <span>Выйти</span>
            </Link>
        </nav>
    )
}

export default NavBarProfile