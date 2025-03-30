import React from 'react';
import DatingLocation from "../datingLocation/DatingLocation";
import HeaderCt from "../header/HeaderCt";
import NavBarHeader from "../header/mainHeaderComponents/navbar/navBarHeader";
import CountryList from "../header/mainHeaderComponents/countrys/countryList";
import IconsHeader from "../header/mainHeaderComponents/icons/iconsHeader";
import UserAvaCt from "../header/mainHeaderComponents/avatarCt/userAvaCt";
import Footer from "../footer/Footer";
import classes from './ListChats.module.css';
import ChatList from "./components/ChatList/ChatList";
import ChatWindow from "./components/ChatWindow/ChatWindow";

function ListChats() {
    const [selectedChat, setSelectedChat] = React.useState(null);
    return (
        <div className={classes.chats__page}>
            <DatingLocation />
            <HeaderCt>
                <NavBarHeader />
                <CountryList />
                <IconsHeader messages="122" />
                <UserAvaCt />
            </HeaderCt>
            <main className={classes.chats__ct}>
                <div className={classes.chats__div}>
                    <ChatList onChatSelect={setSelectedChat} />
                    <ChatWindow />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ListChats;