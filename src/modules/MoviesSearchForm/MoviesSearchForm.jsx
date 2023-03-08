import { useState } from 'react';
import initialState from './initialState';
import PropTypes from 'prop-types';

import css from '../MoviesSearchForm/movieSearchForm.module.css';
const MoviesSearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };
  const { query } = state;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        value={query}
        onChange={handleChange}
        placeholder="Search movies"
        required
      />
      <button className={css.btnSearch} type="submit">
        Search
      </button>
    </form>
  );
};

export default MoviesSearchForm;

MoviesSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};