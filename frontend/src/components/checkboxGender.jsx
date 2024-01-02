import React from "react";
import MaleIcon from '../img/male-icon.svg'
import FemaleIcon from '../img/female-icon.svg'


class CheckBoxsGender extends React.Component {
    render() {
        return (
            <div className="male-female-ct">
                <input id="male-checkbox" type="checkbox"/>
                <label htmlFor="male-checkbox" className="male-checkbox">
                    <img src={MaleIcon} alt=""/>
                </label>
                <input type="checkbox" id="female-checkbox"/>
                <label htmlFor="female-checkbox" className="female-checkbox">
                    <img src={FemaleIcon} alt=""/>
                </label>
            </div>
        )
    }
}

export default CheckBoxsGender