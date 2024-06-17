import classes from './notifications.module.css'
import {IoIosCheckmarkCircle, IoIosInformationCircle, IoIosWarning} from "react-icons/io";
import {useContext, useEffect} from "react";
import {NotificationContext} from "../../contexts/context";

const Notification = () => {
    const { notification, setNotification } = useContext(NotificationContext);
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
            'icon': <IoIosInformationCircle/>,
            'className': classes.warning,
            'header': 'Внимание',
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setNotification({
                'message': '',
                'type': '',
                'has': false
            })
        }, 4150);
    }, [notification.has]);

    const myNotification = notificationTypes[notification.type] || notificationTypes['success'];
    return (
        notification.has &&
        <div className={`${classes.notificationCt} ${myNotification['className']}`}>
            {myNotification['icon']}
            <div>
                <h3>{myNotification['header']}</h3>
                <p>{notification.message}</p>
            </div>
        </div>
    )
}

export default Notification