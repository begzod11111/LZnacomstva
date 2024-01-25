import React, {useState} from "react";
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


export default function SingIn(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')

    function ClicBt(){
        let formData = new FormData()
        formData.set('email', email)
        formData.set('password', password)
        axios({
            method: "post",
            url: 'http://127.0.0.1:8000/api/v1/auth/token/login/',
            data: formData
        })
        .then(function (response) {
            const token = response.data['auth_token']
            if (token){
                localStorage.setItem('token', token);
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
                <LinkBt>Регистрация</LinkBt>
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