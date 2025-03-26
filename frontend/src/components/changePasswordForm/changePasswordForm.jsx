import MainBt from "../UI/button/mainBt";
import MainInput from "../UI/input/MainInput/MainInput";
import {MdEmail} from "react-icons/md";
import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import classes from './changePassword.module.css'
import {CHANGE_PASSWORD_URL} from "../../apiUrls";
import axios from "axios";

function ChangePasswordForm({refEl, ...props}) {
    const [email, setEmail] = useState('')
    const containerRef = useRef(null);
    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            // Клик произошел вне области контейнера, закрываем его
            refEl.current.classList.add(classes.close);
        }
    };
    useEffect(() => {
        // Добавляем обработчик события при монтировании компонента
        document.addEventListener('mousedown', handleClickOutside);

        // Удаляем обработчик события при размонтировании компонента
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const sendEmail = (event) => {
        axios.post(CHANGE_PASSWORD_URL, {email: email})
            .then(r => {containerRef.current.classList.add(classes.close)})
            .catch(e => {})
    }

    return (
        <div className={classNames(
            classes.changePasswordCt,
            classes.close,
        )} ref={refEl}>
            <form ref={containerRef}>
                <h2>Я не помню пароль</h2>
                <span>Введи свой email и мы вышлем тебе инструкции по изменению пароля</span>
                <MainInput
                    icon={<MdEmail/>}
                    type='email'
                    placeholder='Введите электронную почту'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <MainBt onClick={sendEmail} type='button'>Запросить новый пароль</MainBt>
            </form>
        </div>
    )
}
//Введите электронную почту
export default ChangePasswordForm