import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTasks } from '../contexts/TaskContext';
import Header from '../components/Header';
import NewTaskForm from '../components/NewTaskForm';
import FiltersForm from '../components/FiltersForm';

import '../styles/Home.css';
import validateTask from '../utils/validations';

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
    status: '',
  });
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    priority: '',
    dueDate: '',
    status: '',
  });
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const accessToken = localStorage.getItem('keevoAccessToken');

  const handleApiError = (error) => {
    const errorMessage = error?.response?.data?.error?.message || 'Erro ao processar a solicitação.';
    setApiErrorMessage(errorMessage);
  };

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
      } catch (error) {
        handleApiError(error);
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
        status: '',
      });
      getUserTasks();
    } catch (error) {
      handleApiError(error);
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
      handleApiError(error);
    }
  };

  const updateUserTask = async () => {
    const idTask = editedTask.taskId;

    delete editedTask.userId;
    delete editedTask.taskId;
    delete editedTask.createdAt;
    delete editedTask.updatedAt;

    if (editedTask.dueDate) {
      const [datePart] = new Date(editedTask.dueDate).toISOString().split('T');
      editedTask.dueDate = datePart;
    }

    try {
      await axios.patch(`http://localhost:3001/task/update/${idTask}`, editedTask, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setEditedTask(null);
      getUserTasks();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleAddTask = async () => {
    try {
      validateTask(newTask);
    } catch (error) {
      handleApiError(error);
    }

    if (newTask.dueDate) {
      const [datePart] = new Date(newTask.dueDate).toISOString().split('T');
      newTask.dueDate = datePart;
    }

    if (userLogged) {
      createUserTask();
      return;
    }

    newTask.id = Math.random();
    newTask.status = 'TODO';
    newTask.priority = newTask.priority.toUpperCase();

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

  const renderTasksByStatus = (status) => taskData
    .filter((task) => task.status === status)

    .filter((task) => {
      if (filterOptions.priority && task.priority !== filterOptions.priority) return false;
      if (filterOptions.dueDate && task.dueDate !== filterOptions.dueDate) return false;
      if (filterOptions.status && task.status !== filterOptions.status) return false;
      return true;
    })

    .map((task) => (
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
              <option value="LOW">Baixa</option>
              <option value="MEDIUM">Média</option>
              <option value="HIGH">Alta</option>
              <option value="URGENT">Urgente</option>
            </select>

            <input type="date" value={editedTask.dueDate} onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })} />

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
    ));

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setFiltersVisible(false);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div className="todo-app">
      <Header handleNewTaskClick={handleNewTaskClick} toggleFilters={toggleFilters} />

      <NewTaskForm
        showNewTaskForm={showNewTaskForm}
        handleAddTask={handleAddTask}
        setShowNewTaskForm={setShowNewTaskForm}
        newTask={newTask}
        setNewTask={setNewTask}
      />

      <FiltersForm
        filtersVisible={filtersVisible}
        filterOptions={filterOptions}
        handleFilterChange={handleFilterChange}
        handleFilterSubmit={handleFilterSubmit}
      />

      <div className="columns">
        <div className="column">
          <h2>TODO</h2>
          {renderTasksByStatus('TODO')}
        </div>
        <div className="column">
          <h2>DOING</h2>
          {renderTasksByStatus('DOING')}
        </div>
        <div className="column">
          <h2>HOLD</h2>
          {renderTasksByStatus('HOLD')}
        </div>
        <div className="column">
          <h2>DONE</h2>
          {renderTasksByStatus('DONE')}
        </div>
      </div>

      {apiErrorMessage && (
      <div className="error-message">{apiErrorMessage}</div>
      )}
    </div>
  );
}

export default Home;
