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
import React, {useCallback, useState} from "react";
import {FaUser} from "react-icons/fa";
import DataTimeInput from "../UI/input/DataTimeInput";
import CheckBoxsGender from "../UI/checkboxGender/checkboxGender";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AUTH_USERS_URL} from '../../apiUrls'


function SingUp() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const navigate = useNavigate();
    const [gender, setGender] = useState(1);


    const formDateChange = useCallback((key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }, []);

    const getDateOfBirth = useCallback((dateObject) => {
        setDateOfBirth(dateObject);
    }, []);

    const getGender = useCallback((newGender) => {
        setGender(newGender);
    }, []);

    const GetQuestionnaire = useCallback(async () => {
        let dateStr = dateOfBirth.toISOString()['split']('T')[0];
        try {
            const response = await axios.post(
                AUTH_USERS_URL,
                {
                    ...formData,
                    profile: {
                        date_of_birth: dateStr,
                    },
                    gender: gender
                }
            );
            const status = response?.['status'];
            if (status === 201){
                navigate("/sing-in");
            }
        } catch (error) {
            console.log(error);
        }
    }, [formData, dateOfBirth, navigate, gender]);
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
                pText='Присоединяйся к сообществу из 518 млн человек!'>
                <MainInput
                    icon={<FaUser/>}
                    placeholder='Ваше имя'
                    onChange={event => formDateChange('first_name', event.target.value)}/>
                <MainInput
                    icon={<FaUser/>}
                    placeholder='Ваше фамилия'
                    onChange={event => formDateChange('last_name', event.target.value)}/>
                <DataTimeInput collBackFunc={getDateOfBirth} />
                <CheckBoxsGender collBackFunc={getGender}/>
                <MainInput
                    icon={<MdEmail/>}
                    placeholder='Введите электронную почту'
                    onChange={event => formDateChange("email", event.target.value)}/>
                <MainInput
                    icon={<RiLockPasswordFill/>}
                    placeholder='Введите пароль'
                    type='password'
                    onChange={event => formDateChange("password", event.target.value)}/>
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