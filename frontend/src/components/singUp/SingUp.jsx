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
import classes from './singUp.module.css'
import MainBt from "../UI/button/mainBt";
import ChangePasswordBt from "../UI/button/changePasswordBt";
import Footer from "../footer/Footer";
import React from "react";
import {FaUser} from "react-icons/fa";
import DataTimeInput from "../UI/input/dataTimeInput";
import CheckBoxsGender from "../UI/checkboxGender/checkboxGender";


function SingUp() {
    return (
        <>
            <Banners leftBanner={banner_1} rightBanner={banner_2}/>
            <DatingLocation/>
            <HeaderCt>
                <HelpText>Впервые здесь?</HelpText>
                <LinkBt>Регистрация</LinkBt>
            </HeaderCt>
            <FormCt
                className={classes.centerFormCt}
                hText='Создай новый аккаунт'
                pText='Присоединяйся к сообществу из 518 млн человек!'

            >
                <MainInput icon={<FaUser/>} placeholder='Ваше имя'/>
                <DataTimeInput/>
                <CheckBoxsGender/>
                <MainInput icon={<MdEmail/>} placeholder='Введите электронную почту'/>
                <MainInput icon={<RiLockPasswordFill/>} placeholder='Введите пароль' type='password'/>
                <MainBt type='button'>Создать аккаунт</MainBt>
            </FormCt>
            <Footer/>
        </>
    )
}

export default SingUp