import classes from './notifications.module.css'
import {IoIosCheckmarkCircle, IoIosInformationCircle, IoIosWarning} from "react-icons/io";

const Notification = ({errorMessage, typeMessage, ...props}) => {

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

    const myNotification = notificationTypes[typeMessage] || notificationTypes['success']
    return (
        <div className={`${classes.notificationCt} ${myNotification['className']}`} {...props}>
            {myNotification['icon']}
          <div>
            <h3>{myNotification['header']}</h3>
            <p>{errorMessage}</p>
          </div>
        </div>
    )
}

export default Notification