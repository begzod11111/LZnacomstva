import React, { useEffect, useContext, useState, useCallback } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../contexts/context";
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
import Loader from "../loader/loader";
import MainBt from "../UI/button/mainBt";

function Profile() {
    const payload = localStorage.getItem("payload");
    const userId = JSON.parse(payload)?.id;
    const navigate = useNavigate();
    const { setNotification } = useContext(NotificationContext);
    const [formData, setFormData] = useState(null);
    const [hasNotified, setHasNotified] = useState(false);
    const [files, setFiles] = useState({});
    const referenceId = JSON.parse(localStorage.getItem("payload"))?.id;
    const referenceModel = "User";

    // Функция для получения данных профиля
    const fetchProfile = useCallback(async () => {
        const response = await axios.get(`http://127.0.0.1:7000/api/v1/profile/${userId}`, {
            headers: { Authorization: `Token ${localStorage.getItem("accessToken")}` },
        });
        return response.data;
    }, [userId]);

    // Использование react-query для получения данных
    const { data, error, isLoading } = useQuery(["profile", userId], fetchProfile, {
        enabled: !!userId, // Запрос выполняется только если userId существует
    });

    // Функция для отправки данных
    const sendDataFunc = useCallback(async () => {
        if (!formData) return;
        const requests = [];
        if (formData.images) {
            const requests = formData.images.map(async (item) => {
                // Заполняем formData
                const formData = new FormData();
                formData.append('file', item.file);
                formData.append('referenceModel', referenceModel);
                formData.append('referenceId', referenceId);
                if (item.isMain !== undefined) {
                    formData.append('isMain', item.isMain);
                }
                // Определяем URL и метод в зависимости от isNew
                const detail = item.isNew
                    ?  {
                        method: 'POST',
                        url: 'http://127.0.0.1:7000/api/images'
                    }
                    : {
                        method: 'PATCH',
                        url: `http://127.0.0.1:7000/api/images/${item.id}`
                    }

                // Отправляем запрос
                const response = await axios({
                    method: detail.method,
                    url: detail.url,
                    data: formData,
                    headers: { Authorization: `Token ${localStorage.getItem("accessToken")}` },
                })
                return response.data;

                 // Возвращаем результат
            });
            try {
                const results = await Promise.all(requests);
                console.log('Все результаты:', results);
                setNotification({
                    message: "Данные успешно обновлены",
                    type: "success",
                    has: true,
                })
                return results;
            } catch (error) {
                console.error('Ошибка при загрузке:', error);
                throw error;
            }
        }


        // try {
        //     const response = await axios.patch(
        //         `http://127.0.0.1:7000/api/v1/profile/${userId}`,
        //         formData,
        //         {
        //             headers: { Authorization: `Token ${localStorage.getItem("accessToken")}` },
        //         }
        //     );
        //
        //     if (response.status === 200) {
        //         setNotification({
        //             message: "Данные успешно обновлены",
        //             type: "success",
        //             has: true,
        //         });
        //     }
        // } catch (err) {
        //     console.error("Ошибка при обновлении данных:", err);
        //     setNotification({
        //         message: "Произошла ошибка при обновлении данных",
        //         type: "error",
        //         has: true,
        //     });
        // }
    }, [userId, setNotification, formData]);

    // Обработка ошибок
    useEffect(() => {
        if (error && !hasNotified) {
            if (error.response?.status === 404) {
                setNotification({
                    message: "Указанная страница не существует",
                    type: "error",
                    has: true,
                });
                setHasNotified(true);
            } else {
                navigate("/sign-in");
            }
        }
    }, [error, hasNotified, setNotification, navigate]);

    // Лоадер при загрузке
    if (isLoading) {
        return <Loader />;
    }

    // Если ошибка, перенаправляем на страницу входа
    if (error) {
        return null;
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
                <ImagesCtProfile imagesArr={data?.user} setFormData={setFormData} />
                <BasicInformationCt setFormData={setFormData} profileData={data?.user}>
                    <MainBt type="button" onClick={sendDataFunc}>Сохранить</MainBt>
                </BasicInformationCt>
            </ProfileCt>
            <Footer />
        </>
    );
}

export default Profile;