import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { getToken } from './auth';

function withAuthCheck(WrappedComponent) {
    return function(props) {
        const [token, setToken] = useState(null);
        const navigate = useNavigate();
        const location = useLocation();


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

                    setTimeout(() => {
                        navigate('/sing-in')
                    }, 1000);
                }
            } else {
                navigate('/goal-meeting');
            }
            // Ваша функция обновления
        }, [token, navigate]);

        return  <WrappedComponent {...props} />;
    }
}

export default withAuthCheck;