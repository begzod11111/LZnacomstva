import DatingLocation from "../datingLocation/DatingLocation";
import React, {useEffect, useState} from "react";
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


function QuestionnaireList(props) {
    const { goalMeetingSlug } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        let urlAPI = `http://127.0.0.1:8000/api/v1/goal-meeting/`
        if (goalMeetingSlug){
            urlAPI = `http://127.0.0.1:8000/api/v1/goal-meeting/${goalMeetingSlug}`
        }
        axios.get(
            urlAPI,
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            }
        )
        .then(function (response) {
            if (response.data.length){
                setData(response.data)
            } else {
                setData([response.data])
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);
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
                     <React.Fragment >
                        <CategoryName category={cat.name} url={cat['slug']} key={cat.id}/>
                        <QuestionnairesUL accounts={cat['accounts']} key={cat.id}/>
                     </React.Fragment>
                        :
                     <div></div>)
                }
            </QuestionnairesCt>
            <Footer/>
        </>
    )
}

export default QuestionnaireList