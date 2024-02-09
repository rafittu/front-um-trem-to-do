import React, { useEffect } from 'react';
import axios from 'axios';
import { useTasks } from '../contexts/TaskContext';

import '../styles/Home.css';

function Home() {
  const { taskData, setTasksData } = useTasks();

  // Está logado ? buscar tasks no banco de dados : buscar tasks no local storage
  const accessToken = localStorage.getItem('keevoAccessToken');
  const userLocalStorageTasks = localStorage.getItem('userTasks');

  const getUserTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/task/filter', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTasksData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Está logado ?

    if (accessToken) {
      getUserTasks();
    }

    // :

    if (userLocalStorageTasks) {
      setTasksData(userLocalStorageTasks);
    }
  }, []);

  // Renderizar tarefas
  console.log(taskData);
  // Organizar tarefas em colunas

  const renderColumns = () => {
    // const columns = organizeTasks();
    const columns = {
      TODO: [],
      DOING: [],
      HOLD: [],
      DONE: [],
    };

    return (
      <div className="columns">
        {Object.keys(columns).map((columnName) => (
          <div key={columnName} className="column">
            <h2>{columnName}</h2>
            {columns[columnName]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="todo-app">
      <h1>To Do App</h1>
      {renderColumns()}
    </div>
  );
}

export default Home;
