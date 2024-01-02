import React from "react";
import americaIcon from "../img/america-icon.png";


class DatingLocation extends React.Component {
    render() {
        return (
            <div className="dating-location">
                <span>Знакомства по всему миру</span>
                <img className="flag-countries" src={americaIcon} alt=''/>
                <select>
                    <option>Америка</option>
                </select>
            </div>
        )
    }
}

export default DatingLocation
