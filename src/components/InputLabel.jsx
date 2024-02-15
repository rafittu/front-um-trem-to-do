import React from 'react';
import PropTypes from 'prop-types';

function InputLabel({ htmlFor, label, children }) {
  return (
    <label htmlFor={htmlFor}>
      {label}
      {children}
    </label>
  );
}

InputLabel.defaultProps = {
  label: '',
};

InputLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default InputLabel;
