import React from 'react'

function MainInput(props) {
    return (
        <label className="main-input-text">
            <i>{props.icon}</i>
            <input {...props}/>
        </label>
    )
}

export default MainInput;