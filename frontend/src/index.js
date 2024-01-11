import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import SingIn from "./components/singIn/SingIn";
import SingUp from "./components/singUp/SingUp";

const root = ReactDOM.createRoot(document.getElementById('main-container'));


root.render(
    <SingIn/>
);






        // <HeaderCt class='main-header'>
        //     <NavBarHeader/>
        //     <CountryList/>
        //     <IconsHeader messages='455+'/>
        //     <UserAvaCt fullName='asdfghjklzxcvbnz'>
        //         <UserAvatar src={userPhoto}/>
        //     </UserAvaCt>
        // </HeaderCt>