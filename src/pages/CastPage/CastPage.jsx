import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCastMovie } from 'shared/styles/services/movieApi';
import PropTypes from 'prop-types';
import css from '../CastPage/castPage.module.css';

const CastPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCastMovie = async () => {
      try {
        setLoading(true);
        const result = await getCastMovie(movieId);
        // console.log(result);
        setMovies(result);
      } catch ({ response }) {
        setError(response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCastMovie();
  }, [movieId]);

  const elements = movies.map(
    ({ id, character, original_name, profile_path }) => (
      <li key={id}>
        <img
          width="100"
          height="130"
          src={
            profile_path
              ? 'https://image.tmdb.org/t/p/w500' + profile_path
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
          alt={original_name}
        />
        <p>{original_name}</p>
        <p>Character: {character}</p>
      </li>
    )
  );
  return (
    <>
      {loading && <p>...loading</p>}
      {error && <p>Error</p>}
      {movies && (
        <div className={css.castWrapper}>
          <ul>{elements}</ul>
        </div>
      )}
      {movies.length === 0 && (
        <div>We don't have any actors for this movie</div>
      )}
    </>
  );
};
export default CastPage;

CastPage.defaultProps = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      character: PropTypes.string.isRequired,
      original_name: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};