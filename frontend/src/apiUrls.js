// apiUrls.js

import axios from "axios";

export const API_BASE_URL = 'http://127.0.0.1:7000';
export const AUTH_USERS_URL = `${API_BASE_URL}/auth/sing-up/`;
export const GOAL_MEETING_URL = `${API_BASE_URL}/api/goal-meetings/`;
export const GET_PROFILE_URL = `${API_BASE_URL}/api/v1/accounts/me/`;
export const GET_COLOR_CHOICES = `${API_BASE_URL}/api/v1/color-choices/`;
export const CREATE_TOKEN_URL = `${API_BASE_URL}/auth/sing-in/`;
export const REFRESH_TOKEN_URL = `${API_BASE_URL}/auth/jwt/refresh/`;
export const VERIFY_TOKEN_URL = `${API_BASE_URL}/auth/verify/`;
export const CHANGE_PASSWORD_URL = `${API_BASE_URL}/auth/users/reset_password/`;

