import { useParams } from "react-router-dom";
import PersonProfileCt from "./components/personProfileCt/PersonProfileCt";
import PersonImagesCt from "./components/personImagesCt/PersonImagesCt";
import DatingLocation from "../datingLocation/DatingLocation";
import HeaderCt from "../header/HeaderCt";
import NavBarHeader from "../header/mainHeaderComponents/navbar/navBarHeader";
import CountryList from "../header/mainHeaderComponents/countrys/countryList";
import IconsHeader from "../header/mainHeaderComponents/icons/iconsHeader";
import UserAvaCt from "../header/mainHeaderComponents/avatarCt/userAvaCt";
import Footer from "../footer/Footer";
import PersonDataCt from "./components/personData/PersonDataCt";
import axios from "axios";
import Loader from "../loader/loader";
import {useQuery} from "react-query";
import {useContext, useEffect} from "react";
import {NotificationContext} from "../../contexts/context";

function PersonDetail() {
    const { userId } = useParams();
    const fetchUser = async (userId) => {
        const response = await axios.get(
            `http://127.0.0.1:7000/api/v1/users/${userId}/`,
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('accessToken')}`
                }
            }
        );
        return response.data;
    };
    const { data, error, isLoading } = useQuery(['user', userId], () => fetchUser(userId));
    const {setNotification } = useContext(NotificationContext);
    useEffect(() => {
        if (error){
            setNotification({
                'message': error.message,
                'type': 'error',
                'has': true
            });
        }
    }, [error]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        setNotification({
            'message': 'Ошибка загрузки данных',
            'type': 'error',
            'has': true
        })
        return <div></div>;
    }
    const user = data.user;
    return (
        <>
            <DatingLocation />
            <HeaderCt>
                <NavBarHeader />
                <CountryList />
                <IconsHeader />
                <UserAvaCt />
            </HeaderCt>
            <PersonProfileCt>
                <PersonImagesCt images={user.images} />
                <PersonDataCt
                    personData={user}
                    name={user.firstName}
                    dateJoined={user.createdAt}
                />
            </PersonProfileCt>
            <Footer />
        </>
    );
}


export default PersonDetail