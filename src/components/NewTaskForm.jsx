import React from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({
  showNewTaskForm, handleAddTask, setShowNewTaskForm, newTask, setNewTask,
}) {
  return (
    showNewTaskForm && (
      <div className="new-task">
        <h2>Nova Tarefa</h2>

        <input
          type="text"
          placeholder="Título"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />

        <textarea
          placeholder="Descrição"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />

        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="">Selecione a prioridade</option>
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
          <option value="URGENT">Urgente</option>
        </select>

        <label htmlFor="dueDate">
          Data de Vencimento:
          <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
        </label>

        {' '}

        <button type="button" onClick={handleAddTask}>Adicionar Tarefa</button>
        <button type="button" onClick={() => setShowNewTaskForm(false)}>Cancelar</button>
      </div>
    )
  );
}

NewTaskForm.propTypes = {
  showNewTaskForm: PropTypes.bool.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  setShowNewTaskForm: PropTypes.func.isRequired,
  newTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  setNewTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
