import React from 'react';
import classes from './MessageInput.module.css';

function MessageInput({ onSend }) {
    return (
        <div className={classes.input__container}>
            <input
                type="text"
                className={classes.input}
                placeholder="Напишите сообщение..."
            />
            <button
                className={classes.send__button}
                onClick={onSend}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
            </button>
        </div>
    );
}

export default MessageInput;