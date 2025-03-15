import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import AppRouter from "./routers";
import {NotificationProvider} from "./contexts/NotificationProvider";
import {QueryClient, QueryClientProvider} from "react-query";


const root = ReactDOM.createRoot(document.getElementById('main-container'));
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <NotificationProvider>
            <AppRouter/>
        </NotificationProvider>
    </QueryClientProvider>
);
