import React from "react";
import classes from './navbar.module.css'


function NavBarHeader(props){
    return (
        <nav className={classes.navBarHeader}>
            <a href="#" className={classes.activeLink}>Анкеты</a>
            <a href="#">Сообщения</a>
            <a href="#">Подписка</a>
        </nav>
    )
}

export default NavBarHeader