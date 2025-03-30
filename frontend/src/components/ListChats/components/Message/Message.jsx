import React from 'react';
import classes from './Message.module.css';

function Message({ text, isMine, isRead }) {
    return (
        <div
            className={`${classes.message} ${isMine ? classes['message--mine'] : classes['message--theirs']}`}
        >
            <span>{text}</span>
            {isMine && (
                <span
                    className={`${classes.message__status} ${isRead ? classes['message__status--read'] : classes['message__status--unread']}`}
                >
                    {isRead ? '✓✓' : '✓'}
                </span>
            )}
        </div>
    );
}

export default Message;