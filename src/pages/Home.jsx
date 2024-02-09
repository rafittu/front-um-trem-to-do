import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTasks } from '../contexts/TaskContext';

import '../styles/Home.css';

function Home() {
  const [userLogged, setUserLogged] = useState(false);
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
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  const accessToken = localStorage.getItem('keevoAccessToken');

  const getUserTasks = async () => {
    if (accessToken) {
      setUserLogged(true);

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
  }, [newTask, editedTask]);

  const createUserTask = async () => {
    try {
      await axios.post('http://localhost:3001/task/create', newTask, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
      getUserTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/task/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getUserTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserTask = async () => {
    try {
      await axios.patch(`http://localhost:3001/task/update/${editedTask.id}`, editedTask, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setEditedTask(null);
      getUserTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.title.length < 3 || newTask.title.length > 180) {
      alert('O título deve ter entre 3 e 180 caracteres.');
      return;
    }

    if (newTask.description.length < 5 || newTask.description.length > 700) {
      alert('A descrição deve ter entre 5 e 700 caracteres.');
      return;
    }

    if (userLogged) {
      createUserTask();
      return;
    }

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

  const handleDeleteTask = (taskId) => {
    if (userLogged) {
      deleteUserTask(taskId);
      return;
    }

    const updatedTasks = taskData.filter((task) => task.id !== taskId);
    localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
    setTaskData(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = taskData.find((task) => task.id === taskId);
    setEditedTask(taskToEdit);
  };

  const handleSaveEdit = () => {
    if (userLogged) {
      updateUserTask();
    } else {
      const updatedTasks = taskData.map((task) => {
        if (task.id === editedTask.id) {
          return editedTask;
        }
        return task;
      });
      localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
      setTaskData(updatedTasks);
      setEditedTask(null);
    }
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
        <div
          key={task.id}
          className={`task-card priority-${task.priority}`}
          onMouseEnter={() => setExpandedTaskId(task.id)}
          onMouseLeave={() => setExpandedTaskId(null)}
        >
          <button type="button" className="delete-button" onClick={() => handleDeleteTask(task.id)}>X</button>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {expandedTaskId === task.id && (
          <>
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
            <button type="button" onClick={() => handleEditTask(task.id)}>Editar</button>
          </>
          )}
          {editedTask && editedTask.id === task.id && (
          <div>
            <input type="text" value={editedTask.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} />
            <textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            />
            <select
              value={editedTask.priority}
              onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
            >
              <option value="">Selecione a prioridade</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
            <input type="date" value={editedTask.dueDate} onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })} />
            <input type="text" placeholder="Categorias (separadas por vírgula)" value={editedTask.categories.join(', ')} onChange={(e) => setEditedTask({ ...editedTask, categories: e.target.value.split(', ') })} />
            <select
              value={editedTask.status}
              onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
            >
              <option value="">Selecione o status</option>
              <option value="TODO">TODO</option>
              <option value="DOING">DOING</option>
              <option value="HOLD">HOLD</option>
              <option value="DONE">DONE</option>
            </select>
            <button type="button" onClick={handleSaveEdit}>Salvar</button>
          </div>
          )}
        </div>
      ))}

    </div>
  );
}

export default Home;
