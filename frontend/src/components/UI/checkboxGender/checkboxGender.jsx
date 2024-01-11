import React from "react";
import MaleIcon from '../../../img/male-icon.svg'
import FemaleIcon from '../../../img/female-icon.svg'
import './checkboxGender.css'


class CheckBoxsGender extends React.Component {
    render() {
        return (
            <div className='genderCheckboxCt'>
                <input id="male-checkbox" type="checkbox"/>
                <label htmlFor="male-checkbox" className='maleCheckbox'>
                    <img src={MaleIcon} alt=""/>
                </label>
                <input type="checkbox" id="female-checkbox"/>
                <label htmlFor="female-checkbox" className='femaleCheckbox'>
                    <img src={FemaleIcon} alt=""/>
                </label>
            </div>
        )
    }
}

export default CheckBoxsGender