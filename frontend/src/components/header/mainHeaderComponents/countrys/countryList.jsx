import React from "react";
import classes from './countryList.module.css'

function CountryList() {
    return (
        <label className={classes.countryList}>
            <i className="ri-arrow-down-s-line"></i>
            <select>
                <option>Россия</option>
            </select>
        </label>
    )
}

export default CountryList