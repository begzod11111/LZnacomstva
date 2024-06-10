// apiUrls.js

export const API_BASE_URL = 'http://127.0.0.1:8000';
export const AUTH_USERS_URL = `${API_BASE_URL}/auth/users/`;
export const GOAL_MEETING_URL = `${API_BASE_URL}/api/v1/goal-meeting/`;
export const GET_PROFILE_URL = `${API_BASE_URL}/api/v1/accounts/me/`;
export const GET_COLOR_CHOICES = `${API_BASE_URL}/api/v1/color-choices/`;
export const CREATE_TOKEN_URL = `${API_BASE_URL}/auth/jwt/create/`;
export const REFRESH_TOKEN_URL = `${API_BASE_URL}/auth/jwt/refresh/`;
export const VERIFY_TOKEN_URL = `${API_BASE_URL}/auth/jwt/verify/`;