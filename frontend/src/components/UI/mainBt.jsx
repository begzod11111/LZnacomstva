import React from "react";

function MainBt(props) {
    return (
        <button className='main-bt' {...props} >{props.text}</button>
    );
}

export default MainBt