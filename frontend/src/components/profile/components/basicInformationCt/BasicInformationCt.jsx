import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from './BasicInformationCt.module.css';
import MainInput from "../../../UI/input/MainInput/MainInput";
import DataTimeInput from "../../../UI/input/DataTimeInput/DataTimeInput";
import CheckBoxGender from "../../../UI/checkboxGender/checkboxGender";
import TextareaInput from "../../../UI/input/TextareaInput/TextareaInput";
import SelectInput from "../../../UI/input/SelectInput/SelectInput";
import axios from "axios";
import NumberInput from "../../../UI/input/NumberInput/NumberInput";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import classesBt from '../../../UI/input/MainInput/MainInput.module.css';

function BasicInformationCt({ profileData, children, setFormData }) {
    const refsDate = {
        day: useRef(null),
        year: useRef(null),
        select: useRef(null),
    };
    const refsInputs = {
        firstName: useRef(null),
        lastName: useRef(null),
        email: useRef(null),
        height: useRef(null),
        weight: useRef(null),
        aboutMe: useRef(null),
    };
    const [goalMeetings, setGoalMeetings] = useState([]);
    const [updatesDate, setUpdatesDate] = useState({
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        email: profileData?.email || "",
        dateOfBirth: profileData?.dateOfBirth || "",
        height: profileData?.height || "",
        weight: profileData?.weight || "",
        hairColor: profileData?.hairColor || "",
        eyeColor: profileData?.eyeColor || "",
        aboutMe: profileData?.aboutMe || "",
        genderId: profileData?.gender || "",
        goalMeetingId: profileData?.goalMeeting?.slug || "",
    });
    const [dirtyFields, setDirtyFields] = useState({}); // New state to track changed fields

    useEffect(() => {
        axios.get('http://127.0.0.1:7000/api/v1/goalg-metings/', {
            headers: {
                Authorization: `token ${localStorage.getItem('accessToken')}`
            }
        }).then(
            (response) => {
                setGoalMeetings(response.data.result);
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (setFormData && Object.keys(dirtyFields).length > 0) {
            // Filter updatesDate to include only changed fields
            const changedData = Object.keys(dirtyFields).reduce((acc, key) => {
                acc[key] = updatesDate[key];
                return acc;
            }, {});
            setFormData(changedData);
        }
    }, [updatesDate, dirtyFields, setFormData]);

    const formDateChange = useCallback((key, value) => {
        refsInputs[key]?.current?.classList.remove(classesBt.not_correct);
        setUpdatesDate((prevState) => ({
            ...prevState,
            [key]: value,
        }));
        // Mark the field as dirty
        setDirtyFields((prev) => ({
            ...prev,
            [key]: true,
        }));
    }, [refsInputs]);

    const formDateChangeSelect = useCallback((key, value) => {
        setUpdatesDate((prevState) => ({
            ...prevState,
            [key]: value,
        }));
        // Mark the field as dirty
        setDirtyFields((prev) => ({
            ...prev,
            [key]: true,
        }));
    }, []);

    const callbackFunction = useCallback((date) => {
        setUpdatesDate((prevState) => {
            if (prevState.dateOfBirth !== date) {
                setDirtyFields((prev) => ({
                    ...prev,
                    dateOfBirth: true,
                }));
                return { ...prevState, dateOfBirth: date };
            }
            return prevState;
        });
    }, []);

    const colorChoices = {
        hair_colors: [
            { englishName: 'blonde', russianName: 'Блонд', id: 1 },
            { englishName: 'brown', russianName: 'Шатен', id: 2 },
            { englishName: 'black', russianName: 'Черный', id: 3 },
            { englishName: 'red', russianName: 'Рыжий', id: 4 },
            { englishName: 'gray', russianName: 'Седой', id: 5 },
            { englishName: 'Not Answer', russianName: 'Нет ответа', id: 6 },
        ],
        eye_colors: [
            { englishName: 'blue', russianName: 'Голубой', id: 1 },
            { englishName: 'green', russianName: 'Зеленый', id: 2 },
            { englishName: 'brown', russianName: 'Карий', id: 3 },
            { englishName: 'gray', russianName: 'Серый', id: 4 },
            { englishName: 'Not Answer', russianName: 'Нет ответа', id: 5 },
        ],
    };

    const passDateTimeToObject = useCallback((dataTime) => {
        const date = new Date(dataTime);
        return {
            day: date.getDate(),
            month: date.toLocaleString('en', { month: 'long' }),
            year: date.getFullYear(),
        };
    }, []);

    const date_of_birth = passDateTimeToObject(profileData.dateOfBirth);

    return (
        <div className={classes.basicInformationCt}>
            <p>Основная информация</p>
            <span>Имя</span>
            <MainInput
                icon={<FaUser />}
                ref={refsInputs.firstName}
                defaultValue={profileData.firstName}
                name={'firstName'}
                onChange={(event) => formDateChange('firstName', event.target.value)}
            />
            <span>Фамилия</span>
            <MainInput
                icon={<FaUser />}
                ref={refsInputs.lastName}
                name={'lastName'}
                onChange={(event) => formDateChange('lastName', event.target.value)}
                defaultValue={profileData.lastName}
            />
            <span>Дата рождения</span>
            <DataTimeInput defaultValue={date_of_birth} callbackFunc={callbackFunction} refs={refsDate} />
            <span>Пол</span>
            <CheckBoxGender
                callbackFunc={(gender) => formDateChangeSelect('genderId', gender)}
                defaultValue={profileData?.gender}
                disabled={false}
            />
            <p>Личная информация</p>
            <span>Рост</span>
            <NumberInput
                name={'height'}
                ref={refsInputs.height}
                onChange={(event) => formDateChange('height', event.target.value)}
                defaultValue={profileData.height}
            />
            <span>Вес</span>
            <NumberInput
                name={'weight'}
                ref={refsInputs.weight}
                onChange={(event) => formDateChange('weight', event.target.value)}
                defaultValue={profileData.weight}
            />
            <span>Цвет волос</span>
            <SelectInput
                optionsData={colorChoices.hair_colors}
                defaultValue={profileData.hairColor}
                onSelect={(value) => formDateChangeSelect('hairColor', value)}
            />
            <span>Цвет глаз</span>
            <SelectInput
                optionsData={colorChoices.eye_colors}
                defaultValue={profileData.eyeColor}
                onSelect={(value) => formDateChangeSelect('eyeColor', value)}
            />
            <span>Цель знакомства</span>
            <SelectInput
                optionsData={goalMeetings}
                defaultValue={profileData?.goalMeeting?.slug}
                onSelect={(value) => formDateChangeSelect('goalMeetingId', value)}
            />
            <span>О себе</span>
            <TextareaInput
                name={'aboutMe'}
                ref={refsInputs.aboutMe}
                defaultValue={profileData.aboutMe}
                placeholder={profileData.aboutMe ? '' : 'Не указано'}
                onChange={(event) => formDateChange('aboutMe', event.target.value)}
            />
            <p>Аккаунт</p>
            <span>E-mail</span>
            <MainInput
                icon={<MdEmail />}
                ref={refsInputs.email}
                name={'email'}
                onChange={(event) => formDateChange('email', event.target.value)}
                defaultValue={profileData.email}
            />
            <span>Пароль</span>
            <MainInput
                type="password"
                icon={<RiLockPasswordFill />}
                defaultValue="********"
            />
            {children}
        </div>
    );
}

export default BasicInformationCt;