import { useParams } from "react-router-dom";
import PersonProfileCt from "./components/personProfileCt/PersonProfileCt";
import PersonImagesCt from "./components/personImagesCt/PersonImagesCt";
import DatingLocation from "../datingLocation/DatingLocation";
import HeaderCt from "../header/HeaderCt";
import NavBarHeader from "../header/mainHeaderComponents/navbar/navBarHeader";
import CountryList from "../header/mainHeaderComponents/countrys/countryList";
import IconsHeader from "../header/mainHeaderComponents/icons/iconsHeader";
import UserAvaCt from "../header/mainHeaderComponents/avatarCt/userAvaCt";
import React, {useEffect, useState} from "react";
import Footer from "../footer/Footer";
import PersonDataCt from "./components/personData/PersonDataCt";
import axios from "axios";

function PersonDetail() {
    const [data, setData] = useState({});
    const { profileSlug } = useParams();
    useEffect(() => {
        axios.get(
            `http://127.0.0.1:8000/api/v1/accounts/${profileSlug}/`,
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
                <IconsHeader/>
                <UserAvaCt/>
            </HeaderCt>
            <PersonProfileCt>
                <PersonImagesCt images={data['images']} />
                <PersonDataCt
                    personData={{
                        ...data['goal_meeting'],
                        ...data['profile']
                    }}
                    name={data['last_name']}
                    dateJoined={data['date_joined']}
                />
            </PersonProfileCt>
            <Footer/>
        </>
    )
}

export default PersonDetail