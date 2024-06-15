import classes from './notifications.module.css'
import {IoIosCheckmarkCircle, IoIosInformationCircle, IoIosWarning} from "react-icons/io";

const Error = ({errorMessage, typeMessage, ...props}) => {

    const notificationIcons = {
        'error': <IoIosWarning />,
        'success': <IoIosCheckmarkCircle />,
        'info': <IoIosInformationCircle />,
    }

    return (
        <div className={classes.errorCt} {...props}>
            {notificationIcons[typeMessage]}
          <div>
            <h3>{typeMessage}</h3>
            <p>{errorMessage}</p>
          </div>
        </div>
    )
}

export default Error