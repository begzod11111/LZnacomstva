import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { verifyToken } from './auth';
import {NotificationContext} from "../contexts/context";
import axios from "axios";

function withAuthCheck(WrappedComponent) {
    return function(props) {
        const [tokenValid, setTokenValid] = useState(null);
        const navigate = useNavigate();
        const location = useLocation();
        const { setNotification } = useContext(NotificationContext);


        useEffect(() => {
            const tokenToStore = localStorage.getItem('accessToken');
            if (!tokenToStore) {
                setTokenValid(false);
                return;
            }
            const fetchToken = async () => {
                const fetchedToken = await verifyToken(localStorage.getItem('accessToken'));
                if (fetchedToken === false) localStorage.clear();
                setTokenValid(fetchedToken);
            };
            fetchToken().then(
                error => console.log()// Функция, которая будет вызвана, если промис завершится с ошибкой
            );
        }, []);

        useEffect(() => {
            if (tokenValid === null) {
                return;
            }
            if (!tokenValid) {
                if (location.pathname !== '/sing-in') {
                    setNotification({
                        'message': 'Вы не авторизованы',
                        'type': 'error',
                        'has': true
                    })
                    navigate('/sing-in')
                }
            } else {
                if (location.pathname === '/sing-in' || location.pathname === '/') {
                    setNotification({
                        'message': 'Вы уже авторизованы',
                        'type': 'success',
                        'has': true
                    })
                    navigate('/goal-meeting');
                }
            }
            // Ваша функция обновления
        }, [tokenValid, navigate]);

        return  <WrappedComponent {...props} />;
    }
}

export default withAuthCheck;
