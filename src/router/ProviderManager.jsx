import React from 'react';
import Router from './Router';
import { TaskProvider } from '../contexts/TaskContext';

function ProviderManager() {
  return (
    <TaskProvider>
      <Router />
    </TaskProvider>
  );
}

export default ProviderManager;
