import React, {useEffect, useRef, useState} from 'react'
import classes from './mainInput.module.css'
import SelectInput from "./SelectInput";



function DataTimeInput({collBackFunc, defaultValue}) {
    const [date, setDate] = useState(!defaultValue ? {
            day: 0,
            month: 0,
            year: 0,
        }
        :
        defaultValue
    );
    const months = [
        {id: -1, russianName: 'Месяцы', englishName: 'Months'},
        {id: 0, russianName: 'Январь', englishName: 'January'},
        {id: 1, russianName: 'Январь', englishName: 'January'},
        {id: 2, russianName: 'Февраль', englishName: 'February'},
        {id: 3, russianName: 'Март', englishName: 'March'},
        {id: 4, russianName: 'Апрель', englishName: 'April'},
        {id: 5, russianName: 'Май', englishName: 'May'},
        {id: 6, russianName: 'Июнь', englishName: 'June'},
        {id: 7, russianName: 'Июль', englishName: 'July'},
        {id: 8, russianName: 'Август', englishName: 'August'},
        {id: 9, russianName: 'Сентябрь', englishName: 'September'},
        {id: 10, russianName: 'Октябрь', englishName: 'October'},
        {id: 11, russianName: 'Ноябрь', englishName: 'November'},
        {id: 12, russianName: 'Декабрь', englishName: 'December'},
    ];
    const dayRef = useRef(null);
    const yearRef = useRef(null);

    useEffect(() => {
        let classesDay = dayRef.current.classList;
        let classesYear = yearRef.current.classList;
        let isDayCorrect = false;
        let isYearCorrect = false;

        if (date.day){
            isDayCorrect = date.day > 0 && date.day <= 31;

            if (isDayCorrect) {
                classesDay.remove(classes.not_correct);
            } else {
                classesDay.add(classes.not_correct);
            }
        }

        if (date.year){
            let currentYear = new Date().getFullYear();
            let age = currentYear - date.year;
            isYearCorrect = date.year > 999 && date.year < 9999 && age >= 18 && age <= 65;

            if (isYearCorrect) {
                classesYear.remove(classes.not_correct);
            } else {
                classesYear.add(classes.not_correct);
            }
        }
        if (isDayCorrect && isYearCorrect && date.month){
            let selectedDate = new Date(`${date.year}-${date.month}-${date.day}`);
            collBackFunc(selectedDate);
        }
    }, [date]);

    const handleDateChange = (value, key='month', e) => {
        setDate((prevState) => ({
            ...prevState,
            [key]: value
        }));
    };

    return (
        <label className={classes.dataTimeInputLabel}>
            <input ref={dayRef}
                   onChange={(e) => handleDateChange(Number(e.target.value),'day', e)}
                   type="text"
                   placeholder="День"
                   defaultValue={defaultValue ? date.day : ''}
            />
            <SelectInput
                onSelect={handleDateChange}
                defaultValue={defaultValue ? date.month : 'Months'}
                optionsData={months}
            />
            <input
                ref={yearRef}
                onChange={(e) => handleDateChange(Number(e.target.value),'year', e)}
                type="text"
                placeholder="Год"
                defaultValue={defaultValue ? date.year : ''}
            />
        </label>
    )
}

export default DataTimeInput;