import React, {useEffect, useState} from "react";
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


export default function SingIn(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    // useEffect(() => {
    //     const accessToken = localStorage.getItem('accessToken')
    //     if (accessToken){
    //         axios({
    //             method: 'post',
    //             url: VERIFY_TOKEN_URL,
    //             data: {
    //                 'token': accessToken
    //             }
    //         })
    //         .then(function (response) {
    //             if (response.status === 200){
    //                 navigate('/goal-meeting/')
    //             }
    //         })
    //         .catch(async function (error) {
    //             if (error.data.code === 'token_not_valid') {
    //                 localStorage.removeItem('accessToken');
    //                 // localStorage.setItem('accessToken', await getRefreshToken());
    //             }
    //             console.log(error);
    //         });
    //     }
    // }, []);


    function ClicBt(){
        let formData = new FormData()
        formData.set('email', email)
        formData.set('password', password)
        axios({
            method: "post",
            url: CREATE_TOKEN_URL,
            data: formData
        })
        .then(function (response) {
            const refreshToken = response.data['refresh']
            const accessToken = response.data['access']
            if (accessToken && refreshToken){
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')){
                    navigate('/goal-meeting/')
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <>
            <ChangePasswordForm></ChangePasswordForm>
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
                        onChange={event => setEmail(event.target.value)}
                    />
                    <MainInput
                        icon={<RiLockPasswordFill/>}
                        placeholder='Введите пароль'
                        type='password'
                        onChange={event => setPassword(event.target.value)}
                    />

                    <MainBt
                        type='button'
                        onClick={ClicBt}
                    >Войти</MainBt>
                    <ChangePasswordBt/>
            </FormCt>
            <Footer/>
        </>
    )
}