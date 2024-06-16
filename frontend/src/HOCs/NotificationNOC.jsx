import {useState} from "react";


export default function NotificationNOC(WrappedComponent) {

    return function (props) {
        const [notification, setNotification] = useState({
            'errorMessage': '',
            'typeMessage': '',
            'hasError': false
        })
        return (
            <WrappedComponent
                notification={notification}
                setNotification={setNotification}
                {...props}
            />
        )

    }
}