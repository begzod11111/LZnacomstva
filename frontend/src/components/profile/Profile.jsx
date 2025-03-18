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
import React, {useEffect, useContext, useState, useRef} from "react";
import axios from "axios";
import Loader from "../loader/loader";
import { useQuery } from "react-query";
import { NotificationContext } from "../../contexts/context";
import {useNavigate} from "react-router-dom";
import MainBt from "../UI/button/mainBt";

function Profile() {
    const payload = localStorage.getItem('payload');
    const navigate = useNavigate();
    const { setNotification } = useContext(NotificationContext);
    const [hasNotified, setHasNotified] = useState(false);


    const userId = JSON.parse(payload)?.id;

    const fetchProfile = async (userId) => {
        const request = await axios.get(`http://127.0.0.1:7000/api/v1/profile/${userId}`, {
            headers: { Authorization: `Token ${localStorage.getItem('accessToken')}` }
        });
        return request.data;
    };

    const { data, error, isLoading } = useQuery(['profile', userId], () => fetchProfile(userId));

    const sendData = () => {
      console.log('sendData')
    }

    useEffect(() => {
        if (error && !hasNotified) {
            if (error.response && error.response.status === 404) {
                setNotification({
                    'message': 'Указанная страница не существует',
                    'type': 'error',
                    'has': true
                });
                setHasNotified(true);
            }
        }
    }, [error, hasNotified, setNotification]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        navigate('/sing-in')
        return <div></div>;
    }



    return (
        <>
            <DatingLocation />
            <HeaderCt>
                <NavBarHeader />
                <CountryList />
                <IconsHeader />
                <UserAvaCt />
            </HeaderCt>
            <ProfileCt>
                <NavBarProfile />
                <ImagesCtProfile imagesArr={data.user} />
                <BasicInformationCt profileData={data.user}>
                    <MainBt type={'button'} onClick={sendData}>Сохранить</MainBt>
                    </BasicInformationCt>
            </ProfileCt>
            <Footer />
        </>
    );
}

export default Profile;
