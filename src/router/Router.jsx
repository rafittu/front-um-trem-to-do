import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import RecoverPassword from '../pages/RecoverPassword';

function Router() {
  return (
    <Routes>
      <Route exact path="/recover-password" element={<RecoverPassword />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}

export default Router;
