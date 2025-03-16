import React, {useEffect, useRef, useState} from 'react'
import classes from './mainInput.module.css'
import SelectInput from "./SelectInput";

function DataTimeInput({collBackFunc, defaultValue = {day: 0, month: 0, year: 0}, refs}) {
    const [date, setDate] = useState(defaultValue);
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

    useEffect(() => {
        if (date.day === 0 && date.month === 0 && date.year === 0){
            return;
        }
        let classesDay = refs.day.current.classList;
        let classesYear = refs.year.current.classList;
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
        if (date.month !== 'Months'){
            refs.select.current.classList.remove(classes.not_correct);
        } else {
            refs.select.current.classList.add(classes.not_correct);
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
        if (isDayCorrect && isYearCorrect && date.month !== 0 && date.month !== 'Months'){
            let selectedDate = new Date(`${date.year}-${date.month}-${date.day}`).toISOString().split('.')[0] + 'Z';
            collBackFunc(selectedDate);
        } else {
            if (date.day === 0){
                classesDay.add(classes.not_correct);
            } if (date.year === 0){
                classesYear.add(classes.not_correct);
            } if (date.month === 0 || date.month === 'Months'){
                refs.select.current.classList.add(classes.not_correct);
            }
        }
    }, [date]);

    const handleDateChange = (value, key) => {
        setDate((prevState) => ({
            ...prevState,
            [key]: value
        }));
    };

    return (
        <label className={classes.dataTimeInputLabel}>
            <input ref={refs.day}
                   onChange={(e) => handleDateChange(Number(e.target.value),'day', e)}
                   type="text"
                   placeholder="День"
                   defaultValue={defaultValue.day ? date.day : ''}
            />
            <SelectInput
                ref={refs.select}
                onSelect={handleDateChange}
                defaultValue={defaultValue.month ? date.month : 'Months'}
                optionsData={months}
            />
            <input
                ref={refs.year}
                onChange={(e) => handleDateChange(Number(e.target.value),'year', e)}
                type="text"
                placeholder="Год"
                defaultValue={defaultValue.year ? date.year : ''}
            />
        </label>
    )
}

export default DataTimeInput;