import React from "react";
import logo from '../img/logo.svg'
import userPhoto from '../img/user-photo.jpg'



export default class Header extends React.Component {
    render() {
        if (this.props.class === 'main-header'){
            return (
                <header className="main-header">
                    <img alt='logo' className="logo" src={logo}/>
                        <span className="site-name">LZnakomstva.com</span>
                        <nav className="nav-bar-header">
                            <a href="#" className="active-link">Анкеты</a>
                            <a href="#">Сообщения</a>
                            <a href="#">Подписка</a>
                        </nav>
                        <label className="select-country">
                            <i className="ri-arrow-down-s-line"></i>
                            <select>
                                <option>Россия</option>
                            </select>
                        </label>
                        <div className="icons-header">
                            <span>234</span>
                            <button type="button"><i className="ri-menu-search-line"></i></button>
                            <button type="button"><i className="ri-notification-4-fill"></i></button>
                        </div>
                        <a className="user-header-ct">
                            <div className="ava-photo">
                                <img src={userPhoto} alt=""/>
                            </div>
                            <span>Иван Иванов</span>
                        </a>
                </header>
            )
        }
        return (
            <header>
                <img className="logo" src={logo} alt=''/>
                <span className="site-name">LZnakomstva.com</span>
                <span className="span-h2">Впервые здесь?</span>
                <a className="registered main-link-bt" href="#">Регистрация</a>
            </header>
        )
    }
}

