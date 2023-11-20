import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ onClick, isVisible }) {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      Load More
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
