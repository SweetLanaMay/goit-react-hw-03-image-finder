import React from 'react';
import css from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.loadButton} onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default Button;