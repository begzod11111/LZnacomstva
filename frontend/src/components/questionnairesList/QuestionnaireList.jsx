import DatingLocation from "../datingLocation/DatingLocation";
import React, {useEffect, useState} from "react";
import Footer from "../footer/Footer";
import HeaderCt from "../header/HeaderCt";
import HelpText from "../header/defaultHeadersComponents/helpText/HelpText";
import LinkBt from "../UI/button/linkBt";
import NavBarHeader from "../header/mainHeaderComponents/navbar/navBarHeader";
import CountryList from "../header/mainHeaderComponents/countrys/countryList";
import IconsHeader from "../header/mainHeaderComponents/icons/iconsHeader";
import UserAvaCt from "../header/mainHeaderComponents/avatarCt/userAvaCt";
import UserAvatar from "../UI/avatar/userAvatar";
import QuestionnairesCt from "./components/questionnairesCt/QuestionnairesCt";
import CategoryName from "./components/categotyName/CategoryName";
import QuestionnairesUL from "./components/questionnairesUL/QuestionnairesUL";
import axios from "axios";


function QuestionnaireList(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/v1/questionnaire/list/',
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            }
        )
        .then(function (response) {
            setData(response.data)
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
                <UserAvaCt />
            </HeaderCt>
            <QuestionnairesCt>
                {data.map(cat =>
                    <>
                        <CategoryName category={cat.name}/>
                        <QuestionnairesUL questionnaires={cat['questionnaire']}/>
                    </>
                )}
            </QuestionnairesCt>
            <Footer/>
        </>
    )
}

export default QuestionnaireList