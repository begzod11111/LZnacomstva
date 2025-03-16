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
import React, {useCallback, useState, useEffect, useContext} from "react";
import axios from "axios";
import loader from "../loader/loader";
import Loader from "../loader/loader";
import {useQuery} from "react-query";
import notification from "../notifications/Notification";
import {NotificationContext} from "../../contexts/context";
import withAuthCheck from "../../HOCs/withAuthCheck";
import getPayload from "../constants";
import MainBt from "../UI/button/mainBt";

function Profile() {
    const {notification, setNotification} = useContext(NotificationContext);

    async function fetchProfile(userId) {
        const request = await axios.get(`http://127.0.0.1:7000/api/v1/profile/${userId}`, {
            headers: {Authorization: `Token ${localStorage.getItem('accessToken')}`}
        })
        return request.data;
    }
    const payload = getPayload()
    if (!payload) {
        console.log('ddd')

    }
    const userId = payload.id;
    const {data, error, isLoading} = useQuery(['profile', userId], () => fetchProfile(userId));



    useEffect(() => {
        if (error) {
            if (error.status === 404) {
                setNotification({
                    'message': 'Указанная страница не сушествует',
                    'type': 'error',
                    'has': true
                });
            }
        }
    }, [error, notification]);
    if (isLoading) {
        return <Loader/>;
    }
    if (error) {
        return <div></div>
    }

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
                <ImagesCtProfile imagesArr={data.user} />
                <BasicInformationCt profileData={data.user} />
            </ProfileCt>
            <Footer/>
        </>
    )
}



export default Profile;

