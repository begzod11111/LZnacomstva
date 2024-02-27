// router.js

import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import SingUp from "./components/singUp/SingUp";
import SingIn from "./components/singIn/SingIn";
import QuestionnaireList from "./components/questionnairesList/QuestionnaireList";
import PersonDetail from "./components/personDetail/PersonDetail";
import Profile from "./components/profile/Profile";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Profile />}/>
        <Route path="/sing-up/" element={<SingUp />}/>
        <Route path="/goal-meeting/" element={<QuestionnaireList />}/>
        <Route path="/goal-meeting/:goalMeetingSlug" element={<QuestionnaireList />}/>
        <Route path="/profile/:profileSlug" element={<PersonDetail />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;