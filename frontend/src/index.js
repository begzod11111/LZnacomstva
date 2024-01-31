import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import SingIn from "./components/singIn/SingIn";
import SingUp from "./components/singUp/SingUp";
import QuestionnaireList from "./components/questionnairesList/QuestionnaireList";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('main-container'));


root.render(
    <Router>
      <div>
        <Switch>
          {/* Маршрут для компонента SyncUp */}
          <Route path="/syncup">
            <SingUp />
          </Route>

          {/* Маршрут для компонента SyncIn */}
          <Route path="/syncin">
            <SingIn />
          </Route>
        </Switch>
      </div>
    </Router>
);






        // <HeaderCt class='main-header'>
        //     <NavBarHeader/>
        //     <CountryList/>
        //     <IconsHeader messages='455+'/>
        //     <UserAvaCt fullName='asdfghjklzxcvbnz'>
        //         <UserAvatar src={userPhoto}/>
        //     </UserAvaCt>
        // </HeaderCt>