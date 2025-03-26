import React, { useEffect, useRef, useState, useCallback } from 'react';
import classes from './DataTimeInput.module.css';
import SelectInput from '../SelectInput/SelectInput';

const months = [
  { id: -1, russianName: 'Месяцы', englishName: 'Months' },
  { id: 1, russianName: 'Январь', englishName: 'January' },
  { id: 2, russianName: 'Февраль', englishName: 'February' },
  { id: 3, russianName: 'Март', englishName: 'March' },
  { id: 4, russianName: 'Апрель', englishName: 'April' },
  { id: 5, russianName: 'Май', englishName: 'May' },
  { id: 6, russianName: 'Июнь', englishName: 'June' },
  { id: 7, russianName: 'Июль', englishName: 'July' },
  { id: 8, russianName: 'Август', englishName: 'August' },
  { id: 9, russianName: 'Сентябрь', englishName: 'September' },
  { id: 10, russianName: 'Октябрь', englishName: 'October' },
  { id: 11, russianName: 'Ноябрь', englishName: 'November' },
  { id: 12, russianName: 'Декабрь', englishName: 'December' },
];

function DataTimeInput({ callbackFunc, defaultValue = { day: 0, month: 0, year: 0 }, refs }) {
  const [date, setDate] = useState(defaultValue);
  const { day, month, year } = date;

  // Функция для проверки високосного года
  const isLeapYear = useCallback((year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }, []);

  // Функция для определения количества дней в месяце с учетом високосности
  const daysInMonth = useCallback((month, year) => {
    if (month === 2) { // Февраль
      return isLeapYear(year) ? 29 : 28;
    }
    // Месяцы с 31 днем
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      return 31;
    }
    // Остальные месяцы
    return 30;
  }, [isLeapYear]);

  // Валидация даты
  const validateDate = useCallback(() => {
    const isDayValid = day > 0 && day <= daysInMonth(month, year);
    const isMonthValid = month !== 0 && month !== 'Months';
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    const isYearValid = year > 999 && year < 9999 && age >= 18 && age <= 65;

    refs.day.current.classList.toggle(classes.not_correct, !isDayValid);
    refs.select.current.classList.toggle(classes.not_correct, !isMonthValid);
    refs.year.current.classList.toggle(classes.not_correct, !isYearValid);

    if (isDayValid && isMonthValid && isYearValid) {
      const selectedDate = new Date(`${year}-${month}-${day}`).toISOString().split('.')[0] + 'Z';
      callbackFunc(selectedDate);
    }
  }, [day, month, year, daysInMonth, refs, callbackFunc]);

  // Вызов валидации при изменении даты
  useEffect(() => {
    if (day !== 0 || month !== 0 || year !== 0) {
      validateDate();
    }
  }, [day, month, year, validateDate, setDate]);

  // Обработчик изменения даты
  const handleDateChange = useCallback((value, key) => {
    setDate((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  return (
    <label className={classes.dataTimeInputLabel}>
      <input
        ref={refs.day}
        onChange={(e) => handleDateChange(Number(e.target.value), 'day')}
        type="text"
        placeholder="День"
        defaultValue={defaultValue.day || ''}
      />
      <SelectInput
        ref={refs.select}
        onSelect={(value) => handleDateChange(value, 'month')}
        defaultValue={defaultValue.month || 'Months'}
        optionsData={months}
      />
      <input
        ref={refs.year}
        onChange={(e) => handleDateChange(Number(e.target.value), 'year')}
        type="text"
        placeholder="Год"
        defaultValue={defaultValue.year || ''}
      />
    </label>
  );
}

export default DataTimeInput;