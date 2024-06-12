import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from './auth';

function withAuthCheck(WrappedComponent) {
    return function(props) {
        const [token, setToken] = useState(null);
        const navigate = useNavigate();

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
                navigate('/sing-in');
            } else {
                navigate('/goal-meeting');
            }
        }, [token, navigate]);

        return <WrappedComponent {...props} />;
    }
}

export default withAuthCheck;