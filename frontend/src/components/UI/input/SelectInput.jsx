import React, {useEffect, useRef, useState} from "react";
import classes from './mainInput.module.css'
import classNames from 'classnames';

function SelectInput({onSelect, optionsData, defaultValue, ...props}) {
    const [isOpen, setIsOpen] = useState(false);
    const optionsDataArray = optionsData ? optionsData : []
    const [text, setText] = useState(defaultValue)
    const selectRef = useRef(null);
    const clickElement = (e) => {
        const value = e.target.dataset.value
        onSelect(value)
        setIsOpen(false)
        setText(value)
    }

    const getRussianName = (englishName) => {
        let russianName = ''
        optionsDataArray.forEach(el => {
            if (el.englishName === englishName) {
                russianName = el.russianName
            }
        })
        return russianName
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={classes.select__ct} ref={selectRef}>
            <button
                type='button'
                className={`${classes.select__bt} ${isOpen ? classes.open : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}>{getRussianName(text)}</button>
            {isOpen ?
                <ul
                    className={classes.select__ul}
                >
                    {optionsDataArray.map(el =>
                        <li key={el.id}
                            data-value={el.englishName}
                            onClick={clickElement}
                            className={el.englishName === text ? classes.active_li : ''}
                        >{el.russianName}</li>
                    )}
                </ul> : ''
            }
        </div>
    )
}

export default SelectInput