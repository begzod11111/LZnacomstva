import React, {useEffect, useState} from "react";
import classes from './avatarCt.module.css'
import UserAvatar from "../../../UI/avatar/userAvatar";
import axios from "axios";
function UserAvaCt(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/v1/questionnaire/me/',
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            }
        )
        .then(function (response) {
            setData(response.data)
            console.log(data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a className={classes.userAvaCt}>
            <UserAvatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjp8LFYajbhHMd20yUVshNfMdmHzf5ycSndgMWcr3ODA&s'/>
            <span>{props.fullName}</span>
        </a>
    )
}

export default UserAvaCt