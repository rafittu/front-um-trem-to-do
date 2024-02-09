import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [taskData, setTaskData] = useState([]);

  const taskContext = useMemo(
    () => ({
      taskData,
      setTaskData,
    }),
    [taskData],
  );

  return (
    <TaskContext.Provider value={taskContext}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
