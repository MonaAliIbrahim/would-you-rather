import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Components
const Login = React.lazy(() => import('./views/login/login'));
const Home = React.lazy(() => import('./views/home/home'));
const QuestionDetails = React.lazy(() => import('./views/question_details/question_details'));
const NewQuestion = React.lazy(() => import('./views/new-question/new-question'));
const Users = React.lazy(() => import('./views/users/users'));
const PageNotFound = React.lazy(() => import('./views/page-not-found/page-not-found'));

function RoutesApp() {
  return(
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Home />} />
      <Route path="/question/:id" element={<QuestionDetails />} />
      <Route path="/questions/bad_id" element={<PageNotFound />} />
      <Route path="/leaderboard" element={<Users />} />
      <Route path="/add" element={<NewQuestion />} />
    </Routes>
  )
}

export default RoutesApp;