import React, { useState } from "react";
import MaleIcon from '../../../img/male-icon.svg'
import FemaleIcon from '../../../img/female-icon.svg'
import './checkboxGender.css'

const CheckBoxsGender = ({collBackFunc, defaultValue, ...props}) => {
    const [gender, setGender] = useState(defaultValue ? defaultValue : 1);


    const handleGenderChange = (newGender) => {
        setGender(newGender);
        collBackFunc(newGender);
    };

    return (
        <div className='genderCheckboxCt'>
            <input id="male-radio" type="radio" name="gender" checked={gender === 1} onChange={() => handleGenderChange(1)}/>
            <label htmlFor="male-radio" className='maleCheckbox'>
                <img src={MaleIcon} alt=""/>
            </label>
            <input type="radio" id="female-radio" name="gender" checked={gender === 2} onChange={() => handleGenderChange(2)}/>
            <label htmlFor="female-radio" className='femaleCheckbox'>
                <img src={FemaleIcon} alt=""/>
            </label>
        </div>
    )
}

export default CheckBoxsGender