import DatingLocation from "../datingLocation/DatingLocation";
import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import HeaderCt from "../header/HeaderCt";
import NavBarHeader from "../header/mainHeaderComponents/navbar/navBarHeader";
import CountryList from "../header/mainHeaderComponents/countrys/countryList";
import IconsHeader from "../header/mainHeaderComponents/icons/iconsHeader";
import UserAvaCt from "../header/mainHeaderComponents/avatarCt/userAvaCt";
import QuestionnairesCt from "./components/questionnairesCt/QuestionnairesCt";
import CategoryName from "./components/categotyName/CategoryName";
import QuestionnairesUL from "./components/questionnairesUL/QuestionnairesUL";
import axios from "axios";
import {GOAL_MEETING_URL, REFRESH_TOKEN_URL} from '../../apiUrls'
import Notification from "../notifications/Notification";
import {NotificationContext} from "../../contexts/context";


function QuestionnaireList() {
    const { goalMeetingSlug } = useParams();
    const [data, setData] = useState([]);
    const { setNotification } = useContext(NotificationContext);


    useEffect(() => {
        let urlAPI = `http://127.0.0.1:8000/api/goal-meeting/`
        if (goalMeetingSlug){
            urlAPI =`${GOAL_MEETING_URL}${goalMeetingSlug}`;
        }
        axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('accessToken')}`;
        axios.get(urlAPI)
        .then(function (response) {
            if (response.data.length){
                setData(response.data)
            } else {
                setData([response.data])
            }
        })
        .catch(function (error) {

            // Вместо простого вывода ошибки в консоль, вы можете установить состояние ошибки
            setNotification({
                'errorMessage': 'Ошибка загрузки данных',
                'typeMessage': 'error',
                'hasError': true
            })
        });
    }, [goalMeetingSlug]);
    return (
        <>
            <DatingLocation/>
            <HeaderCt>
                <NavBarHeader/>
                <CountryList/>
                <IconsHeader messages='122'/>
                <UserAvaCt/>
            </HeaderCt>
            <QuestionnairesCt>
                {
                    data.map(cat =>
                        cat['accounts'].length
                            ?
                        <React.Fragment key={cat.id}>
                            <CategoryName category={cat.name} url={cat['slug']} />
                            <QuestionnairesUL accounts={cat['accounts']} />
                        </React.Fragment>
                            :
                        <div key={cat.id}></div>
                    )
                }
            </QuestionnairesCt>
            <Footer/>

        </>
    )
}

export default QuestionnaireList
