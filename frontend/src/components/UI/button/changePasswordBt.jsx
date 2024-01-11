import React from "react";
import classes from './myButton.module.css'

function ChangePasswordBt() {
    return (
        <button className={classes.changePassword} id="change-password" type='button'>Я не помню пароль</button>
    )
}

export default ChangePasswordBt