import React from "react";
import classes from './navbar.module.css'
import {useLocation} from "react-router-dom";


function NavBarHeader(props){
    const location = useLocation();
    const hrefs = [
        '/goal-meeting/',
        '/chats/',
        '/'
    ]
    return (
        <nav className={classes.navBarHeader}>
                {hrefs.map(href => (
                    <a
                        key={href}
                        href={href}
                        className={`${location.pathname === href ? classes.activeLink : ''}`}
                    >
                        {href === '/' ? 'Подписка' : href === '/goal-meeting/' ? 'Анкеты' : 'Чаты'}
                    </a>
                ))}
        </nav>
    )
}

export default NavBarHeader