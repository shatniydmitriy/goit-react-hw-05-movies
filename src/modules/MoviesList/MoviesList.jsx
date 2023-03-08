import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from '../MoviesList/moviesList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  const elements = movies.map(({ id, title }) => (
    <li key={id}>
      <Link to={`/movies/${id}`} state={{ from: location }}>
        {title}
      </Link>
    </li>
  ));
  return <>{movies && <ul className={css.moviesList}>{elements}</ul>}</>;
};
export default MoviesList;

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};