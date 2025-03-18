import classes from "./navBarProfile.module.css"
import {Link, useNavigate} from "react-router-dom";
import { FaUser } from "react-icons/fa";
import {IoBookmark, IoWalletSharp} from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import classNames from "classnames";
import {useContext} from "react";
import {NotificationContext} from "../../../../contexts/context";

function NavBarProfile() {
     const {setNotification} = useContext(NotificationContext);
     const navigate = useNavigate();

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
            <a className={classes.navBarBt} onClick={() => {
                setNotification({
                    'message': 'Вы вышли из аккаунта',
                    'type': 'success',
                    'has': true
                })
                localStorage.clear();
                navigate('/sing-in')

            }}>
                <MdLogout className={classes.navBarBtSVG}/>
                <span>Выйти</span>
            </a>
        </nav>
    )
}

export default NavBarProfile