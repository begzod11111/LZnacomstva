import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import AppRouter from "./routers";
const root = ReactDOM.createRoot(document.getElementById('main-container'));


root.render(
    <AppRouter/>
);
