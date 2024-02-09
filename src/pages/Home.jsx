import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTasks } from '../contexts/TaskContext';

import '../styles/Home.css';

function Home() {
  const { taskData, setTaskData } = useTasks();
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    id: '',
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    categories: [],
    status: '',
  });

  const accessToken = localStorage.getItem('keevoAccessToken');

  const getUserTasks = async () => {
    if (accessToken) {
      try {
        const response = await axios.get('http://localhost:3001/task/filter', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTaskData(response.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      const userLocalStorageTasks = JSON.parse(localStorage.getItem('userTasks')) || [];
      setTaskData(userLocalStorageTasks);
    }
  };

  useEffect(() => {
    getUserTasks();
  }, [newTask]);

  const handleAddTask = async () => {
    console.log(newTask);
    newTask.id = Math.random();
    newTask.status = 'TODO';

    const userTasks = JSON.parse(localStorage.getItem('userTasks')) || [];

    const updatedTasks = [...userTasks, newTask];

    localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
    setShowNewTaskForm(false);
    setNewTask({
      id: '',
      title: '',
      description: '',
      priority: '',
      dueDate: '',
      categories: [],
      status: '',
    });
    setTaskData(updatedTasks);
  };

  const handleNewTaskClick = () => {
    setShowNewTaskForm(true);
    setNewTask({
      title: '',
      description: '',
      priority: '',
      dueDate: '',
      categories: [],
    });
  };

  return (
    <div className="todo-app">
      <section>
        <h1>To Do App</h1>
        <button type="button" onClick={handleNewTaskClick}>+ NOVA TAREFA</button>
      </section>

      { showNewTaskForm && (
      <div className="new-task">
        <h2>Nova Tarefa</h2>
        <input type="text" placeholder="Título" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
        <textarea placeholder="Descrição" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="">Selecione a prioridade</option>
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
          <option value="urgent">Urgente</option>
        </select>
        <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
        <input type="text" placeholder="Categorias (separadas por vírgula)" value={newTask.categories.join(', ')} onChange={(e) => setNewTask({ ...newTask, categories: e.target.value.split(', ') })} />
        <button type="button" onClick={handleAddTask}>Adicionar Tarefa</button>
        <button type="button" onClick={() => setShowNewTaskForm(false)}>Cancelar</button>
      </div>
      )}

      {taskData.map((task) => (
        <div key={task.id} className={`task-card priority-${task.priority}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
            Data de Vencimento:
            {task.dueDate}
          </p>
          <p>
            Categorias:
            {task.categories.join(', ')}
          </p>
          <p>
            Status:
            {task.status}
          </p>
        </div>
      ))}

    </div>
  );
}

export default Home;
