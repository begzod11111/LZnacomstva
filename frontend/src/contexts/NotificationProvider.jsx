import React, { useState, useEffect } from 'react';
import { NotificationContext } from './context';
import Notification from "../components/notifications/Notification";

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    'message': '',
    'type': '',
    'has': false
  });


  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      <Notification/>
      {children}
    </NotificationContext.Provider>
  );
};