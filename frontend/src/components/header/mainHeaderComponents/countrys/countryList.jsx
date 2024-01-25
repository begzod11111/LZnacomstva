import React from "react";
import classes from './countryList.module.css'

function CountryList() {
    return (
        <div className={classes.countryList}>
            <i className="ri-arrow-down-s-line"></i>
            <select>
                <option>Россия</option>
            </select>
        </div>
    )
}

export default CountryList