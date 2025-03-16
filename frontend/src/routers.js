// router.js

import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import SingUp from "./components/singUp/SingUp";
import SingIn from "./components/singIn/SingIn";
import QuestionnaireList from "./components/questionnairesList/QuestionnaireList";
import PersonDetail from "./components/personDetail/PersonDetail";
import Profile from "./components/profile/Profile";
import withAuthCheck from "./HOCs/withAuthCheck";


const QuestionnaireListWithAuthCheck = withAuthCheck(QuestionnaireList)
// Вместо QuestionnaireList используйте QuestionnaireListWithAuthCheck
const SingInWithAuthCheck = withAuthCheck(SingIn);
// Используйте QuestionnaireListWithAuthCheck вместо QuestionnaireList
const ProfileWithAuthCheck = withAuthCheck(Profile);


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<SingInWithAuthCheck />}/>
        <Route path="/sing-up/" element={<SingUp />}/>
        <Route path='/sing-in/' element={<SingInWithAuthCheck />}/>
        <Route path="/goal-meeting/" element={<QuestionnaireListWithAuthCheck />}/>
        <Route path="/goal-meeting/:goalMeetingSlug" element={<QuestionnaireList />}/>
        <Route path="/profile/:userId" element={<PersonDetail />}/>
        <Route path='/home/' element={<ProfileWithAuthCheck />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;