import {useState} from "react";


export default function NotificationNOC(WrappedComponent) {

    return function NotificationNOC(props) {

        return (
            <WrappedComponent
                notification={notification}
                setNotification={setNotification}
                {...props}
            />
        )

    }
}
