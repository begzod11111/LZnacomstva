import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { getToken } from './auth';
import {NotificationContext} from "../contexts/context";

function withAuthCheck(WrappedComponent) {
    return function(props) {
        const [token, setToken] = useState(null);
        const navigate = useNavigate();
        const location = useLocation();
        const { setNotification } = useContext(NotificationContext);


        useEffect(() => {
            const fetchToken = async () => {
                const fetchedToken = await getToken();
                setToken(fetchedToken);
            };
            fetchToken().then(

                error => console.log()// Функция, которая будет вызвана, если промис завершится с ошибкой
            );
        }, []);

        useEffect(() => {
            if (token === null) {
                return; // Если токен еще не был получен, ничего не делаем
            }
            if (!token) {
                if (location.pathname !== '/sing-in') {
                    setNotification({
                        'message': 'Вы не авторизованы',
                        'type': 'error',
                        'has': true
                    })
                    navigate('/sing-in')
                }
            } else {
                if (location.pathname === '/sing-in') {
                    setNotification({
                        'message': 'Вы уже авторизованы',
                        'type': 'success',
                        'has': true
                    })
                    navigate('/goal-meeting');
                }
            }
            // Ваша функция обновления
        }, [token, navigate]);

        return  <WrappedComponent {...props} />;
    }
}

export default withAuthCheck;