// src/HOCs.js
import axios from 'axios';
import {REFRESH_TOKEN_URL, VERIFY_TOKEN_URL} from "../apiUrls";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export async function verifyToken(token) {
    try {
        const response = await axios.post(VERIFY_TOKEN_URL, {
            token: token
        });
        return response.data?.tokenValid;
    } catch (error) {
        console.error('Failed to verify token', error);
        return false;
    }

}



async function getRefreshToken(refreshToken) {

    try {
        const response = await axios.post(VERIFY_TOKEN_URL, {
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
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return false;
    } else return accessToken;
}



