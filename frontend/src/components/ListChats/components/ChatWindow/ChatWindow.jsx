import React, { useEffect, useRef } from 'react';
import classes from './ChatWindow.module.css';
import Message from "../Message/Message";
import MessageInput from "../../../UI/MessageInput/MessageInput";

const messages = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    text: `Сообщение ${index + 1}: Это тестовое сообщение с длинным текстом, чтобы проверить, как работает прокрутка и отображение при большом количестве сообщений.`,
    isMine: index % 2 === 0,
    isRead: index < 45,
}));

function ChatWindow() {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleSendMessage = () => {
        console.log("Сообщение отправлено!");
    };

    return (
        <section className={classes.chat__window}>
            <div className={classes.messages}>
                {messages.map(message => (
                    <Message
                        key={message.id}
                        text={message.text}
                        isMine={message.isMine}
                        isRead={message.isRead}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSend={handleSendMessage} />
        </section>
    );
}

export default ChatWindow;