import MainBt from "../../../UI/button/mainBt";
import classes from './questionnairesUL.module.css'
import React from 'react'
import {Link} from "react-router-dom";

function QuestionnairesLItem(props) {
    let account = props.user;
    const country = account.country
    return (
        <li key={account.id}>
            <Link to={`/profile/${account._id}`}/>
            <img src={account.photo} alt=''/>
            <div>
                <span className="user-active"></span>
                <h3>{account.lastName} {account.age}</h3>
                <div className="icon-country">
                    <img src={country.flagUrl} alt=""/>
                </div>
                <span className={classes.nameCountry}>{country.name}</span>
            </div>
            <MainBt>Свайп</MainBt>
        </li>
    )
}


function QuestionnairesUL(props) {
    return (
        <ul className={classes.peopleList}>
            {props.users.map(item =>
                <QuestionnairesLItem key={item._id} user={item}/>
            )}
        </ul>
    )
}

export default QuestionnairesUL