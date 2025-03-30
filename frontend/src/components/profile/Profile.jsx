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
  const payload = JSON.parse(localStorage.getItem("payload") || "{}");
  const userId = payload?.id;
  const referenceId = userId;
  const referenceModel = "User";
  const navigate = useNavigate();
  const { setNotification } = useContext(NotificationContext);
  const [formData, setFormData] = useState(null);
  const [images, setImages] = useState([]);
  const [hasNotified, setHasNotified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Для состояния загрузки

  // Заголовки авторизации
  const authHeader = { Authorization: `Token ${localStorage.getItem("accessToken")}` };

  // Функция для получения данных профиля
  const fetchProfile = useCallback(async () => {
    const response = await axios.get(`http://127.0.0.1:7000/api/v1/profile/${userId}`, {
      headers: authHeader,
    });
    return response.data;
  }, [userId, authHeader]);

  const { data, error, isLoading } = useQuery(["profile", userId], fetchProfile, {
    enabled: !!userId,
  });

  const refreshLocalStore = (ava='', fullname='') => {
    const payload = JSON.parse(localStorage.getItem('payload'))
    payload.ava = ava || payload.ava
    payload.fullName = fullname || payload.fullName
    localStorage.setItem('payload', JSON.stringify(payload));
  }

  // Функция для отправки изображений
  const uploadImages = useCallback(
    async (images) => {
      if (!images || images.length === 0) return [];

      const requests = images.map(async (item) => {
        const imageFormData = new FormData();
        imageFormData.append("referenceModel", referenceModel);
        imageFormData.append("referenceId", referenceId);
        imageFormData.append("file", item.file);
        if (item.isMain !== undefined) {
          imageFormData.append("isMain", item.isMain);
        }
        if (item.id === 'default') item.isNew = true;
        const detail = item.isNew
          ? { method: "POST", url: "http://127.0.0.1:7000/api/images" }
          : { method: "PATCH", url: `http://127.0.0.1:7000/api/images/${item.id}` };

        const response = await axios({
          method: detail.method,
          url: detail.url,
          data: imageFormData,
          headers: authHeader,
        });
        return response.data;
      });

      return Promise.all(requests);
    },
    [referenceModel, referenceId, authHeader]
  );

  // Функция для обновления профиля
  const updateProfile = useCallback(
    async (profileData) => {
      const response = await axios.patch(
        `http://127.0.0.1:7000/api/v1/profile/${userId}`,
        profileData,
        { headers: authHeader }
      );
      return response.data;
    },
    [userId, authHeader]
  );

  // Основная функция отправки данных
  const sendDataFunc = useCallback(async () => {

    setIsSubmitting(true);
    try {
      const imageResults = await uploadImages(images);
      const profileResult = await updateProfile(formData);

      console.log("Изображения:", imageResults);
      console.log("Профиль:", profileResult);

      refreshLocalStore(imageResults[0]?.image?.url, profileResult?.fullName);
      setNotification({
        message: "Данные успешно обновлены",
        type: "success",
        has: true,
      });
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error.response?.data || error.message);
      setNotification({
        message: "Произошла ошибка при обновлении данных",
        type: "error",
        has: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, uploadImages, updateProfile, setNotification]);

  // Обработка ошибок загрузки профиля
  useEffect(() => {
    if (error && !hasNotified) {
      if (error.response?.status === 404) {
        setNotification({
          message: "Указанная страница не существует",
          type: "error",
          has: true,
        });
      } else {
        navigate("/sign-in");
      }
      setHasNotified(true);
    }
  }, [error, hasNotified, setNotification, navigate]);

  if (isLoading) return <Loader />;
  if (error) return null;

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
        <ImagesCtProfile imagesArr={data?.user} setFormData={setImages} />
        <BasicInformationCt setFormData={setFormData} profileData={data?.user}>
          <MainBt type="button" onClick={sendDataFunc} disabled={isSubmitting}>
            {isSubmitting ? "Сохранение..." : "Сохранить"}
          </MainBt>
        </BasicInformationCt>
      </ProfileCt>
      <Footer />
    </>
  );
}

export default Profile;