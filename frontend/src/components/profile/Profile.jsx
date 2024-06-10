import DatingLocation from "../datingLocation/DatingLocation";
import HeaderCt from "../header/HeaderCt";
import NavBarHeader from "../header/mainHeaderComponents/navbar/navBarHeader";
import CountryList from "../header/mainHeaderComponents/countrys/countryList";
import IconsHeader from "../header/mainHeaderComponents/icons/iconsHeader";
import UserAvaCt from "../header/mainHeaderComponents/avatarCt/userAvaCt";
import Footer from "../footer/Footer";
import NavBarProfile from "./components/navBarProfile/NavBarProfile";
import ProfileCt from "./components/profileCt/ProfileCt";
import ImagesCtProfile from "./components/imagesCtProfile/ImagesCtProfile";
import BasicInformationCt from "./components/basicInformationCt/BasicInformationCt";
import React, {useCallback, useState, useEffect} from "react";
import axios from "axios";
import {GET_PROFILE_URL, GET_COLOR_CHOICES} from "../../apiUrls";

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [colorChoices, setColorChoices] = useState(null);



    useEffect(() => {
        // Запрос данных профиля при монтировании компонента
        axios.get(GET_PROFILE_URL, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        })
        .then(response => {
            setProfileData(response.data);
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
        // Запрос данных о цветах глаз и волос при монтировании компонента
        axios.get(GET_COLOR_CHOICES, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        })
        .then(response => {
            setColorChoices(response.data);
        })
        .catch(error => {
            console.error('Error fetching color choices:', error);
        });
    }, []);

    return (
        <>
            <DatingLocation/>
            <HeaderCt>
                <NavBarHeader/>
                <CountryList/>
                <IconsHeader/>
                <UserAvaCt />
            </HeaderCt>
            <ProfileCt>
                <NavBarProfile/>
                <ImagesCtProfile imagesArr={profileData}/>
                <BasicInformationCt profileData={profileData} colorChoices={colorChoices} />
            </ProfileCt>
            <Footer/>
        </>
    )
}

export default Profile