import React from 'react';
import Router from './Router';
import { TaskProvider } from '../contexts/TaskContext';
import { UserProvider } from '../contexts/UserContext';

function ProviderManager() {
  return (
    <UserProvider>
      <TaskProvider>
        <Router />
      </TaskProvider>
    </UserProvider>
  );
}

export default ProviderManager;
