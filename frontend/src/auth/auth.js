// src/auth.js
import axios from 'axios';
import {REFRESH_TOKEN_URL, VERIFY_TOKEN_URL} from "../apiUrls";

async function verifyToken(token) {
    try {
        const response = await axios.post(VERIFY_TOKEN_URL, {
            token: token
        });
        return response.status === 200;
    } catch (error) {
        console.error('Failed to verify token', error);
        return false;
    }

}

async function getRefreshToken(refreshToken) {

    try {
        const response = await axios.post(REFRESH_TOKEN_URL, {
            refresh: refreshToken
        });

        if (response.data && response.data.access) {
            return response.data.access;
        }
    } catch (error) {
        console.error('Failed to refresh token', error);
        return false;
    }
}

export async function getToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    if (!refreshToken && !accessToken) {
        return false;
    }
    const isTokenValid = await verifyToken(accessToken);
    if (isTokenValid) {
        return accessToken;
    } else {
        const newAccessToken = await getRefreshToken(refreshToken);
        if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
            return newAccessToken;
        } else {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            return false;
        }
    }
}


