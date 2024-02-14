import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ handleNewTaskClick, toggleFilters }) {
  return (
    <section>
      <div className="user-actions">
        <Link to="/login">Entrar</Link>
      </div>

      <h1>To Do App</h1>
      <div>
        <button className="new-task-button" type="button" onClick={handleNewTaskClick}>+ NOVA TAREFA</button>
        <button className="filter-button" type="button" onClick={toggleFilters}>FILTROS</button>
      </div>
    </section>
  );
}

Header.propTypes = {
  handleNewTaskClick: PropTypes.func.isRequired,
  toggleFilters: PropTypes.func.isRequired,
};

export default Header;
