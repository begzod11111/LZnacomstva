import React, { useState } from 'react';
import classes from './ChatList.module.css';

const chatItems = [
    {
        id: 1,
        name: "Анна",
        message: "Привет, как дела?",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShHUUKugl91N4C2dE6zyH2QwngkxpvPCRaaw&s",
        isActive: true,
    },
    {
        id: 2,
        name: "Игорь",
        message: "Ты где?",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShHUUKugl91N4C2dE6zyH2QwngkxpvPCRaaw&s",
        isActive: false,
    },
];

function ChatList({ onChatSelect }) {
    const [activeChat, setActiveChat] = useState(null);

    const handleChatClick = (chatId) => {
        setActiveChat(chatId);
        onChatSelect(chatId); // Передаем ID выбранного чата родителю
    };

    return (
        <ul className={classes.chats__ul}>
            {chatItems.map(chat => (
                <li
                    data-id={chat.id}
                    onClick={() => handleChatClick(chat.id)}
                    key={chat.id}
                    className={`${classes.chats__ul__li} ${
                        activeChat === chat.id ? classes['chats__ul__li__active'] : ''
                    }`}
                >
                    <div className={classes.chats__ul__li__avatar}>
                        <img
                            className={classes.chats__ul__li__img}
                            src={chat.avatar}
                            alt={`${chat.name}'s avatar`}
                            loading="lazy"
                        />
                        <span
                            className={`${classes.chats__ul__li__status} ${
                                chat.isActive 
                                    ? classes['chats__ul__li__status--active'] 
                                    : classes['chats__ul__li__status--inactive']
                            }`}
                        />
                    </div>
                    <div className={classes.chats__ul__li__detail}>
                        <h3 className={classes.chats__ul__li__detail__h3}>
                            {chat.name}
                        </h3>
                        <span className={classes.chats__ul__li__detail__span}>
                            {chat.message}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default ChatList;