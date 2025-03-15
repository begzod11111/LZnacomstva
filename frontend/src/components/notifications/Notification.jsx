import classes from './notifications.module.css'
import { IoIosCheckmarkCircle, IoIosInformationCircle, IoIosWarning } from "react-icons/io";
import { useContext, useEffect, useRef } from "react";
import { NotificationContext } from "../../contexts/context";
import { IoCloseSharp } from "react-icons/io5";

const Notification = () => {
    const { notification, setNotification } = useContext(NotificationContext);
    const notificationCtPef = useRef(null);
    const notificationTypes = {
        'error': {
            'icon': <IoIosWarning />,
            'className': classes.error,
            'header': 'Ошибка'
        },
        'success': {
            'icon': <IoIosCheckmarkCircle />,
            'className': classes.success, // 'success' is default class
            'header': 'Успешно'
        },
        'warning': {
            'icon': <IoIosInformationCircle />,
            'className': classes.warning,
            'header': 'Внимание',
        }
    }

    const close = (event) => {
        const el = notificationCtPef.current;
        el.classList.add(classes.close);
        setTimeout(() => {
            setNotification({
                'message': '',
                'type': '',
                'has': false
            });
        }, 700);
    }

    const myNotification = notificationTypes[notification.type] || notificationTypes['success'];
    return (
        notification.has &&
        <div ref={notificationCtPef}
            className={`${classes.notificationCt} ${myNotification['className']}`}>
            {myNotification['icon']}
            <div>
                <h3>{myNotification['header']}</h3>
                <p>{notification.message}</p>
            </div>
            <button
                type='button'
                onClick={close}
            ><IoCloseSharp /></button>
        </div>
    )
}

export default Notification