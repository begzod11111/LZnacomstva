import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import SingIn from "./components/singIn/SingIn";
import SingUp from "./components/singUp/SingUp";
import QuestionnaireList from "./components/questionnairesList/QuestionnaireList";
const root = ReactDOM.createRoot(document.getElementById('main-container'));


root.render(
    <QuestionnaireList/>
);






        // <HeaderCt class='main-header'>
        //     <NavBarHeader/>
        //     <CountryList/>
        //     <IconsHeader messages='455+'/>
        //     <UserAvaCt fullName='asdfghjklzxcvbnz'>
        //         <UserAvatar src={userPhoto}/>
        //     </UserAvaCt>
        // </HeaderCt>