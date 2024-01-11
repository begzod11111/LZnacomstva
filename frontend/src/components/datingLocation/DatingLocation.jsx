import React from "react";
import americaIcon from "../../img/america-icon.png";
import classes from './datingLocation.module.css'


function DatingLocation(props) {
    return (
        <div className={classes.datingLocation}>
            <span>Знакомства по всему миру</span>
            <img className={classes.flagCountries} src={americaIcon} alt=''/>
            <select>
                <option>Америка</option>
            </select>
        </div>
    )

}

export default DatingLocation
