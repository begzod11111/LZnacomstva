import React from "react";
import classes from './myButton.module.css'

function ChangePasswordBt(props) {
    return (
        <button
            className={classes.changePassword}
            id="change-password"
            type='button'
            {...props}
        >Я не помню пароль</button>
    )
}

export default ChangePasswordBt