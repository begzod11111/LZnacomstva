import MainBt from "../../../UI/button/mainBt";
import classes from './questionnairesUL.module.css'
import React from 'react'
import {Link} from "react-router-dom";

function QuestionnairesLItem(props) {
    let account = props['account'];
    const country = account['country']
    const profile = account['profile']
    const images = account['images'][0]
    return (
        <li key={account.id}>
            <Link to={`/profile/${account['slug']}`}/>
            <img src={images['image']} alt=''/>
            <div>
                <span className="user-active"></span>
                <h3>{account['last_name']} {profile['age']}</h3>
                <div className="icon-country">
                    <img src={country['flag']} alt=""/>
                </div>
                <span className={classes.nameCountry}>{country['name']}</span>
            </div>
            <MainBt>Свайп</MainBt>
        </li>
    )
}


function QuestionnairesUL(props) {
    return (
        <ul className={classes.peopleList}>
            {props['accounts'].map(item =>
                <QuestionnairesLItem account={item}/>
            )}
        </ul>
    )
}

export default QuestionnairesUL