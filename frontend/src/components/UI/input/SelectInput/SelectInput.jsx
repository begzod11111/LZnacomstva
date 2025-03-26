import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './selectImput.module.css';

const SelectInput = React.forwardRef(({
  onSelect,
  optionsData = [],
  defaultValue = '',
  selectorType = 'month',
  ariaLabel = 'Выберите опцию',
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const selectRef = useRef(null);

  // Создаем словарь для быстрого поиска русских названий
  const optionsMap = useMemo(() =>
    optionsData.reduce((acc, option) => {
      acc[option.englishName] = option.russianName;
      return acc;
    }, {}),
    [optionsData]
  );

  // Обновление состояния при изменении defaultValue
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  // Обработка кликов вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Добавляем обработчик кликов
    document.addEventListener('mousedown', handleClickOutside);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (englishName) => {
    onSelect(englishName, selectorType);
    setIsOpen(false);
    setSelectedValue(englishName);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  return (
    <div
      className={classes.select__ct}
      ref={selectRef}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <button
        type="button"
        ref={ref}
        className={classNames(classes.select__bt, {
          [classes.open]: isOpen
        })}
        onClick={toggleDropdown}
        aria-label={ariaLabel}
        aria-controls="select-list"
      >
        {optionsMap[selectedValue] || 'Выберите значение'}
      </button>

      <ul
        id="select-list"
        className={classes.select__ul}
        role="listbox"
        aria-labelledby="select-button"
      >
        {optionsData.map(({ id, englishName, russianName }) => (
          <li
            key={id}
            role="option"
            data-value={englishName}
            onClick={() => handleOptionClick(englishName)}
            className={classNames({
              [classes.active_li]: englishName === selectedValue
            })}
            aria-selected={englishName === selectedValue}
          >
            {russianName}
          </li>
        ))}
      </ul>
    </div>
  );
});

SelectInput.propTypes = {
  onSelect: PropTypes.func.isRequired,
  optionsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      englishName: PropTypes.string.isRequired,
      russianName: PropTypes.string.isRequired,
    })
  ),
  defaultValue: PropTypes.string,
  selectorType: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default SelectInput;