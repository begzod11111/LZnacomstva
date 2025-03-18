import classes from './BasicInformationCt.module.css'
import MainInput from "../../../UI/input/MainInput";
import DataTimeInput from "../../../UI/input/DataTimeInput";
import CheckBoxGender from "../../../UI/checkboxGender/checkboxGender";
import TextareaInput from "../../../UI/input/TextareaInput";
import SelectInput from "../../../UI/input/SelectInput";
import React, {useCallback, useRef, useState} from "react";
import classesBt from "../../../UI/input/mainInput.module.css";

function BasicInformationCt({profileData, children, collBackFunc, ...props}) {
    const [refsDate] = useState({
        day: useRef(null),
        year: useRef(null),
        select: useRef(null),
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })
    const [refsInputs] = useState({
        firstName: useRef(null),
        lastName: useRef(null),
        email: useRef(null),
    })
    const formDateChange = useCallback((key, value) => {
        refsInputs[key].current.classList.remove(classesBt.not_correct);
        setFormData((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }, []);
    if (!profileData) {
        return null;
    }
    const colorChoices = {
        hair_colors: [
            {englishName: 'blonde', russianName: 'Блонд', id: 1},
            {englishName: 'brown', russianName: 'Шатен', id: 2},
            {englishName: 'black', russianName: 'Черный', id: 3},
            {englishName: 'red', russianName: 'Рыжий', id: 4},
            {englishName: 'gray', russianName: 'Седой', id: 5},
            {englishName: 'Not Answer', russianName: 'Нет ответа', id: 6},
        ],
        eye_colors: [
            {englishName: 'blue', russianName: 'Голубой', id: 1},
            {englishName: 'green', russianName: 'Зеленый', id: 2},
            {englishName: 'brown', russianName: 'Карий', id: 3},
            {englishName: 'gray', russianName: 'Серый', id: 4},
            {englishName: 'Not Answer', russianName: 'Нет ответа', id: 5},
        ]
    }
    function passDateTimeToObject(dataTime) {
        let date = new Date(dataTime);
        return {
            day: Number(date.getDay()),
            month: date.toLocaleString('en', { month: 'long' }),
            year: Number(date.getFullYear()),
        };
    }
    function foo() {
        return null
    }
    let profile = profileData;
    let date_of_birth = passDateTimeToObject(profile['dateOfBirth'])
    return (
        <div className={classes.basicInformationCt}>
                <p>Основная информация</p>
                <span>Имя</span>
                <MainInput
                    ref={refsInputs.firstName}
                    defaultValue={profileData['firstName']}
                    name={'firstName'}
                    onChange={event => formDateChange('firstName', event.target.value)}/>
                />
                <span>Фамилия</span>
                <MainInput
                    ref={refsInputs.lastName}
                    name={'lastName'}
                    onChange={event => formDateChange('lastName', event.target.value)}
                    defaultValue={profileData['lastName']}
                />
                <span>Дата рождения</span>
                <DataTimeInput defaultValue={date_of_birth} collBackFunc={foo} refs={refsDate}/>
                <span>Пол</span>
                <CheckBoxGender defaultValue={profileData['gender']}/>
                <p>Личная информация</p>
                <span>Рост</span>
                <MainInput defaultValue={profile['height']}/>
                <span>Вес</span>
                <MainInput defaultValue={profile['weight']}/>
                <span>Цвет волос</span>
                <SelectInput optionsData={colorChoices['hair_colors']} defaultValue={profile['hairColor']}/>
                <span>Цвет глаз</span>
                <SelectInput optionsData={colorChoices['eye_colors']} defaultValue={profile['eyeColor']}/>
                <span>Цель знакомства</span>
                <SelectInput/>
                <span>О себе</span>
                <TextareaInput placeholder={profile['aboutMe'] ? profile['aboutMe'] : 'Не указанно'}/>
                <p>Аккаунт</p>
                <span>E-mail</span>
                <MainInput
                    ref={refsInputs.email}
                    name={'email'}
                    onChange={event => formDateChange('email', event.target.value)}
                    defaultValue={profileData['email']}
                />
                <span>Пароль</span>
                <MainInput defaultValue='********'/>
            {children}
        </div>
    )
}

export default BasicInformationCt