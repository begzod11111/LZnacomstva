import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import AppRouter from "./routers";
import {NotificationProvider} from "./contexts/NotificationProvider";
const root = ReactDOM.createRoot(document.getElementById('main-container'));


root.render(
    <NotificationProvider>
        <AppRouter/>
    </NotificationProvider>
);
