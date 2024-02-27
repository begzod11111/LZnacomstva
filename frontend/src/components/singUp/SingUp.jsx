import Banners from "../UI/banner/Banners";
import banner_1 from "../../img/banner_3.svg";
import banner_2 from "../../img/banner_4.svg";
import DatingLocation from "../datingLocation/DatingLocation";
import HeaderCt from "../header/HeaderCt";
import HelpText from "../header/defaultHeadersComponents/helpText/HelpText";
import LinkBt from "../UI/button/linkBt";
import FormCt from "../form/FormCt";
import MainInput from "../UI/input/MainInput";
import {MdEmail} from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";
import MainBt from "../UI/button/mainBt";
import Footer from "../footer/Footer";
import React, {useState} from "react";
import {FaUser} from "react-icons/fa";
import DataTimeInput from "../UI/input/dataTimeInput";
import CheckBoxsGender from "../UI/checkboxGender/checkboxGender";
import axios from "axios";
import {redirect, useNavigate} from "react-router-dom";



function SingUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate();

    function GetQuestionnaire(){
        axios.post(
            'http://127.0.0.1:8000/auth/users/',
            {
                "first_name": username,
                "email": email,
                "password": password,
                "profile": {},
                "gender": {}
            }
        )
        .then(function (response) {
            const status = response?.['status']
            console.log(status)
            if (status === 201){
                navigate("/sing-in");
            }
            return null
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            <Banners leftBanner={banner_1} rightBanner={banner_2}/>
            <DatingLocation/>
            <HeaderCt>
                <HelpText>У вас уже есть аккаунт?</HelpText>
                <LinkBt href="/sing-in">Войти</LinkBt>
            </HeaderCt>
            <FormCt
                hText='Создай новый аккаунт'
                pText='Присоединяйся к сообществу из 518 млн человек!'
            >
                <MainInput
                    icon={<FaUser/>}
                    placeholder='Ваше имя'
                    onChange={event => setUsername(event.target.value)}
                />
                <DataTimeInput/>
                <CheckBoxsGender/>
                <MainInput
                    icon={<MdEmail/>}
                    placeholder='Введите электронную почту'
                    onChange={event => setEmail(event.target.value)}
                />
                <MainInput
                    icon={<RiLockPasswordFill/>}
                    placeholder='Введите пароль'
                    type='password'
                    onChange={event => setPassword(event.target.value)}
                />
                <MainBt
                    onClick={GetQuestionnaire}
                    type='button'
                >Создать аккаунт</MainBt>
            </FormCt>
            <Footer/>
        </>
    )
}

export default SingUp