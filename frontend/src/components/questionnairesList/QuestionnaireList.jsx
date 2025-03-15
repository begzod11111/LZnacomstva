import DatingLocation from "../datingLocation/DatingLocation";
import React, {useContext, useEffect} from "react";
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
import { GOAL_MEETING_URL } from '../../apiUrls';
import Notification from "../notifications/Notification";
import { NotificationContext } from "../../contexts/context";
import Loader from "../loader/loader";
import { useQuery } from "react-query";

function QuestionnaireList() {
    const { goalMeetingSlug } = useParams();
    const { setNotification } = useContext(NotificationContext);

    const fetchGoalMeetingData = async (goalMeetingSlug) => {
        let urlAPI = `http://127.0.0.1:7000/api/v1/main/`;
        if (goalMeetingSlug) {
            urlAPI = `${GOAL_MEETING_URL}${goalMeetingSlug}`;
        }
        const response = await axios.get(
            urlAPI,
            {
                headers: {
                    Authorization: `Token ${localStorage.getItem('accessToken')}`
                }
            }
        );
        return response.data;
    };

    const { data, error, isLoading } = useQuery(['goalMeeting', goalMeetingSlug], () => fetchGoalMeetingData(goalMeetingSlug));

    useEffect(() => {
        if (error) {
            setNotification({
                'message': error.message,
                'type': 'error',
                'has': true
            });
        }
        return () => {}
    }, []);
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div></div>;
    }

    return (
        <>
            <DatingLocation />
            <HeaderCt>
                <NavBarHeader />
                <CountryList />
                <IconsHeader messages='122' />
                <UserAvaCt />
            </HeaderCt>
            <QuestionnairesCt>
                {
                    data.result.map(cat =>
                    cat['users'].length
                        ? (
                            <React.Fragment key={cat._id}>
                                <CategoryName category={cat.name} url={cat.slug} />
                                <QuestionnairesUL users={cat.users} />
                            </React.Fragment>
                        )
                        : <div key={cat._id}></div>
                    )

                }
            </QuestionnairesCt>
            <Footer />
        </>
    );
}

export default QuestionnaireList;