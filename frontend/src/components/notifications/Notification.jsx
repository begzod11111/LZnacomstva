import { useContext, useEffect, useRef } from 'react';

import { NotificationContext } from '../../contexts/context';
import styles from './notifications.module.css';
import {IoIosCheckmarkCircle, IoIosInformationCircle, IoIosWarning} from "react-icons/io";
import {IoCloseSharp} from "react-icons/io5";

const NOTIFICATION_TYPES = {
  error: {
    icon: <IoIosWarning />,
    className: styles.error,
    header: 'Ошибка'
  },
  success: {
    icon: <IoIosCheckmarkCircle />,
    className: styles.success,
    header: 'Успешно'
  },
  warning: {
    icon: <IoIosInformationCircle />,
    className: styles.warning,
    header: 'Внимание'
  }
};

const DEFAULT_TYPE = 'success';
const ANIMATION_DURATION = 700; // ms

const Notification = () => {
  const { notification, setNotification } = useContext(NotificationContext);
  const notificationRef = useRef(null);

  const handleClose = () => {
    const element = notificationRef.current;
    if (!element) return;

    element.classList.add(styles.close);

    const timer = setTimeout(() => {
      setNotification({
        message: '',
        type: '',
        has: false
      });
      clearTimeout(timer);
    }, ANIMATION_DURATION);
  };

  // Обработчик клавиши Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && notification.has) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [notification.has]);

  if (!notification.has) return null;

  const currentNotification = NOTIFICATION_TYPES[notification.type] ||
                            NOTIFICATION_TYPES[DEFAULT_TYPE];

  return (
    <div
      ref={notificationRef}
      className={`${styles.notificationCt} ${currentNotification.className}`}
      role="alert"
      aria-live="polite"
    >
      {currentNotification.icon}
      <div className={styles.content}>
        <h3>{currentNotification.header}</h3>
        <p>{notification.message}</p>
      </div>
      <button
        type="button"
        onClick={handleClose}
        className={styles.closeButton}
        aria-label="Закрыть уведомление"
      >
        <IoCloseSharp />
      </button>
    </div>
  );
};

export default Notification;