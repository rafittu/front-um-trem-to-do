import React from 'react';
import PropTypes from 'prop-types';

function FiltersForm({
  filtersVisible, filterOptions, handleFilterChange, handleFilterSubmit,
}) {
  return (
    filtersVisible && (
      <form className="filters-form" onSubmit={handleFilterSubmit}>
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="priority">
              <span>Prioridade:</span>
              <select id="priority" name="priority" value={filterOptions.priority} onChange={handleFilterChange}>
                <option value="">Todas</option>
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
                <option value="URGENT">Urgente</option>
              </select>
            </label>
          </div>

          <div className="filter-group">
            <label htmlFor="dueDate">
              <span>Data de Vencimento:</span>
              <input
                id="dueDate"
                type="date"
                name="dueDate"
                value={filterOptions.dueDate}
                onChange={handleFilterChange}
              />
            </label>
          </div>

          <div className="filter-group">
            <label htmlFor="status">
              <span>Status:</span>
              <select id="status" name="status" value={filterOptions.status} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="TODO">TODO</option>
                <option value="DOING">DOING</option>
                <option value="HOLD">HOLD</option>
                <option value="DONE">DONE</option>
              </select>
            </label>
          </div>
        </div>
      </form>
    )
  );
}

FiltersForm.propTypes = {
  filtersVisible: PropTypes.bool.isRequired,
  filterOptions: PropTypes.shape({
    priority: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleFilterSubmit: PropTypes.func.isRequired,
};

export default FiltersForm;
