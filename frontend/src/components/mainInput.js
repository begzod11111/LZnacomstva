import React from "react";

export default class MainInput extends React.Component {
    placeholder = this.props.placeholder
    icon = this.props.icon;
    type = this.props.type;
    render() {
        if (this.type === 'dataTime'){
            return (
                <label className="main-data-input">
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
        return (
            <label className="main-input-text">
                <i>{this.icon}</i>
                <input type={!this.type ? 'text': this.type} placeholder={this.placeholder}/>
            </label>
        );
    }
}

