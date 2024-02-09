import React from 'react';
import { Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <Routes>
      <Route exact path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/" element={<SignIn />} />
    </Routes>
  );
}

export default Router;
