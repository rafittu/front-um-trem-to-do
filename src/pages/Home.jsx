import React, { useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';

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

  return (
    <>section</>
  );
}

export default Home;
