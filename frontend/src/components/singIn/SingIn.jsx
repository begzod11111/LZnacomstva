import React, {useContext, useEffect, useRef, useState} from "react";
import DatingLocation from "../datingLocation/DatingLocation";
import HeaderCt from "../header/HeaderCt";
import HelpText from "../header/defaultHeadersComponents/helpText/HelpText";
import LinkBt from "../UI/button/linkBt";
import Banners from "../UI/banner/Banners";
import banner_1 from "../../img/banner_1.svg";
import banner_2 from "../../img/banner_2.svg";
import FormCt from "../form/FormCt";
import MainInput from "../UI/input/MainInput";
import {MdEmail} from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";
import MainBt from "../UI/button/mainBt";
import ChangePasswordBt from "../UI/button/changePasswordBt";
import Footer from "../footer/Footer";
import ChangePasswordForm from "../changePasswordForm/changePasswordForm";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {CREATE_TOKEN_URL, REFRESH_TOKEN_URL, VERIFY_TOKEN_URL} from "../../apiUrls";
import classesChange from '../changePasswordForm/changePassword.module.css'
import classesBt from '../UI/input/mainInput.module.css'
import Notification from "../notifications/Notification";
import {NotificationContext} from "../../contexts/context";


export default function SingIn() {
    const [data, setData] = useState({
        'email': '',
        'password': ''
    })
    const { setNotification } = useContext(NotificationContext);
    const navigate = useNavigate();
    const changePasswordRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            // Выполните нужное действие, например, отправку формы или обновление состояния
            sendForm()
        }
    };

    function sendForm(){
        if (!data.email || !data.password) {
            emailRef.current.classList.add(classesBt.not_correct)
            passwordRef.current.classList.add(classesBt.not_correct)
            setNotification({
                'message': 'Заполните все поля',
                'type': 'warning',
                'has': true
            })
            return
        }
        axios({
            method: "post",
            url: "http://127.0.0.1:7000/auth/sing-in/",
            data: data
        })
        .then(function (response) {
            const accessToken = response.data.token
            const payload = response.data.payload
            if (accessToken){
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('payload', JSON.stringify(payload));
                if (localStorage.getItem('accessToken')){
                    setNotification({
                        'message': 'Вы успешно авторизовались',
                        'type': 'success',
                        'has': true
                    })
                    navigate('/goal-meeting/')
                }
            }
        })
        .catch(function (error) {
            if (!error.response) {
                // Обработка ошибок, когда нет ответа от сервера
                setNotification({
                    'message': 'Ошибка сети',
                    'type': 'error',
                    'has': true
                })
            } else if (error.response.status === 401 || error.response.status === 400) {
                setNotification({
                    'message': 'Неверный логин или пароль',
                    'type': 'error',
                    'has': true
                })
            }
        });
    }
    const onChanges = (key, event) => {
        const el = event.target
        if (key === 'email' && emailRef.current.classList.contains(classesBt.not_correct)){
            emailRef.current.classList.remove(classesBt.not_correct)
        } else if (key === 'password' && passwordRef.current.classList.contains(classesBt.not_correct)){
            passwordRef.current.classList.remove(classesBt.not_correct)
        }
        setData((prevState) => ({
            ...prevState,
            [key]: el.value
        }))
    }
    const openChangePassForm = (vent) => {
        const el = changePasswordRef.current
        if (el.classList.contains(classesChange.close)){
            el.classList.remove(classesChange.close)
        } else {
            el.classList.add(classesChange.close)
        }
    }
    return (
        <>
            <ChangePasswordForm refEl={changePasswordRef}></ChangePasswordForm>
            <Banners leftBanner={banner_1} rightBanner={banner_2}/>
            <DatingLocation/>
            <HeaderCt>
                <HelpText>Впервые здесь?</HelpText>
                <LinkBt href="/sing-up">Регистрация</LinkBt>
            </HeaderCt>
            <FormCt
                hText='Знакомства без преград'
                pText='Для современного мира сплочённость команды профессионалов однозначно фиксирует необходимость системы обучения кадров, соответствующей насущным потребностям.'
            >
                    <MainInput
                        ref={emailRef}
                        icon={<MdEmail/>}
                        placeholder='Введите электронную почту'
                        type='email'
                        name='email'
                        onChange={event => onChanges('email', event)}
                        autoComplete='email'
                    />
                    <MainInput
                        ref={passwordRef}
                        icon={<RiLockPasswordFill/>}
                        placeholder='Введите пароль'
                        type='password'
                        name='password'
                        onChange={event => {onChanges('password', event)}}
                        onKeyPress={handleKeyDown}
                        autoComplete='current-password'
                    />
                    <MainBt
                        type='button'
                        onClick={sendForm}
                    >Войти</MainBt>
                    <ChangePasswordBt onClick={openChangePassForm}/>
            </FormCt>
            <Footer/>

        </>
    )
}