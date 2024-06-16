import React, {useEffect, useRef, useState} from "react";
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
import classes from '../changePasswordForm/changePassword.module.css'
import Notification from "../notifications/Notification";


export default function SingIn({notification, setNotification, ...props}) {
    const [data, setData] = useState({
        'email': '',
        'password': ''
    })
    const navigate = useNavigate();
    const changePasswordRef = useRef(null);



    function sendForm(){

        if (!data.email || !data.password){
            setNotification({
                'errorMessage': 'Заполните все поля',
                'typeMessage': 'warning',
                'hasError': true
            })
            return
        }
        axios({
            method: "post",
            url: CREATE_TOKEN_URL,
            data: data
        })
        .then(function (response) {
            const refreshToken = response.data['refresh']
            const accessToken = response.data['access']
            if (accessToken && refreshToken){
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')){
                    setNotification({
                        'errorMessage': 'Вы успешно авторизовались',
                        'typeMessage': 'success',
                        'hasError': true
                    })
                    setTimeout(() => {
                        navigate('/goal-meeting/')
                    }, 1000);
                }
            }
        })
        .catch(function (error) {
            if (!error.response) {
                // Обработка ошибок, когда нет ответа от сервера
                setNotification({
                    'errorMessage': 'Ошибка сети',
                    'typeMessage': 'error',
                    'hasError': true
                })
            } else if (error.response.status === 401){
                setNotification({
                    'errorMessage': 'Неверный логин или пароль',
                    'typeMessage': 'error',
                    'hasError': true
                })
            }
        });
    }

    const openChangePassForm = (vent) => {
        const el = changePasswordRef.current
        if (el.classList.contains(classes.close)){
            el.classList.remove(classes.close)
        } else {
            el.classList.add(classes.close)
        }
    }
    return (
        <>
            {notification.hasError && <Notification errorMessage={notification.errorMessage}
                                           typeMessage={notification.typeMessage}/>}
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
                        icon={<MdEmail/>}
                        placeholder='Введите электронную почту'
                        type='email'
                        name='email'
                        onChange={event => {
                            setData((prevState) => ({
                                email: event.target.value,
                                password: prevState.password
                            }))
                            setNotification({
                                'errorMessage': '',
                                'typeMessage': '',
                                'hasError': false

                            })
                        }}
                        autoComplete='email'
                    />
                    <MainInput
                        icon={<RiLockPasswordFill/>}
                        placeholder='Введите пароль'
                        type='password'
                        name='password'
                        onChange={event => {
                            setData((prevState) => ({
                                email: prevState.email,
                                password: event.target.value,
                            }))
                            setNotification({
                                'errorMessage': '',
                                'typeMessage': '',
                                'hasError': false
                            })
                        }}
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