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
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {FaUser} from "react-icons/fa";
import DataTimeInput from "../UI/input/DataTimeInput";
import CheckBoxGender from "../UI/checkboxGender/checkboxGender";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AUTH_USERS_URL} from '../../apiUrls'
import {NotificationContext} from "../../contexts/context";
import classesBt from '../UI/input/mainInput.module.css'


function SingUp() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })
    const [refsDate, setRefsDate] = useState({
        day: useRef(null),
        year: useRef(null),
        select: useRef(null),
    });
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const navigate = useNavigate();
    const [gender, setGender] = useState(1);
    const { setNotification } = useContext(NotificationContext);
    const [refsInputs, setRefsInputs] = useState({
        first_name: useRef(null),
        last_name: useRef(null),
        email: useRef(null),
        password: useRef(null),
    })


    const formDateChange = useCallback((key, value) => {
        refsInputs[key].current.classList.remove(classesBt.not_correct);
        setFormData((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }, []);

    const getDateOfBirth = useCallback((dateObject) => {
        setDateOfBirth(dateObject)
    }, []);

    const getGender = useCallback((newGender) => {
        setGender(newGender);
    }, []);

    const inCorrectCheckInputs = () => {
        if (!formData.first_name){
            refsInputs.first_name.current.classList.add(classesBt.not_correct);
        } if (!formData.last_name){
            refsInputs.last_name.current.classList.add(classesBt.not_correct);
        } if (!formData.email){
            refsInputs.email.current.classList.add(classesBt.not_correct);
        } if (!formData.password){
            refsInputs.password.current.classList.add(classesBt.not_correct);
        } if (dateOfBirth === null){
            refsDate.select.current.classList.add(classesBt.not_correct);
            refsDate.day.current.classList.add(classesBt.not_correct);
            refsDate.year.current.classList.add(classesBt.not_correct);
        }
    }

    const GetQuestionnaire = useCallback(async () => {
        if (!formData.first_name && !formData.last_name && !formData.email && !formData.password && dateOfBirth === null){
            setNotification({
                'message': 'Заполните все поля',
                'type': 'warning',
                'has': true
            })
            inCorrectCheckInputs();
            return
        }
        let status;
        try {
            let dateStr = dateOfBirth.toISOString()['split']('T')[0];
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
            status = response?.['status'];
            if (status === 201){
                setNotification({
                    'message': 'Аккаунт успешно создан',
                    'type': 'success',
                    'has': true
                })
                navigate("/sing-in");
            }
        } catch (error) {
            console.log(error);
            status = error?.response?.status;
            if (status === 400){
                setNotification({
                    'message': 'Пользователь с таким email уже существует',
                    'type': 'warning',
                    'has': true
                });
            } else {
                setNotification({
                    'message': 'Ошибка сервера',
                    'type': 'error',
                    'has': true
                });
            }
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
                    ref={refsInputs.first_name}
                    icon={<FaUser/>}
                    placeholder='Ваше имя'
                    name='first_name'
                    onChange={event => formDateChange('first_name', event.target.value)}/>
                <MainInput
                    ref={refsInputs.last_name}
                    icon={<FaUser/>}
                    placeholder='Ваше фамилия'
                    name='last_name'
                    onChange={event => formDateChange('last_name', event.target.value)}/>
                <DataTimeInput refs={refsDate} collBackFunc={getDateOfBirth} />
                <CheckBoxGender collBackFunc={getGender}/>
                <MainInput
                    ref={refsInputs.email}
                    icon={<MdEmail/>}
                    placeholder='Введите электронную почту'
                    autoComplete='email'
                    type='email'
                    name='email'
                    onChange={event => formDateChange("email", event.target.value)}/>
                <MainInput
                    ref={refsInputs.password}
                    autoComplete='current-password'
                    icon={<RiLockPasswordFill/>}
                    placeholder='Введите пароль'
                    type='password'
                    name='password'
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