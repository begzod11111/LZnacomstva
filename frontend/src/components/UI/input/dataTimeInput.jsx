import React from 'react'
import classes from './mainInput.module.css'

function DataTimeInput(props) {
    return (
        <label className={classes.dataTimeInputLabel}>
            <input type="text" placeholder="День"/>
            <i className="ri-arrow-down-s-line"></i>
            <select name="" id="">
                <option selected disabled>Месяц</option>
                <option></option>
                <option></option>
            </select>
            <input type="text" placeholder="Год"/>
        </label>
    )
}

export default DataTimeInput;