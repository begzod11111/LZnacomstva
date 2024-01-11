import MainBt from "../UI/button/mainBt";
import MainInput from "../UI/input/MainInput";
import {MdEmail} from "react-icons/md";
import React from "react";
import classNames from "classnames";
import classes from './changePassword.module.css'

function ChangePasswordForm() {
    return (
        <div className={classNames(
            classes.changePasswordCt,
            classes.close,
        )}>
            <form action="" method="post">
                <h2>Я не помню пароль</h2>
                <span>Введи свой email и мы вышлем тебе инструкции по изменению пароля</span>
                <MainInput icon={<MdEmail/>} placeholder='Введите электронную почту'/>
                <MainBt type='subbmit'>Запросить новый пароль</MainBt>
            </form>
        </div>
    )
}
//Введите электронную почту
export default ChangePasswordForm