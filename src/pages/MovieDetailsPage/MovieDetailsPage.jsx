import { useState, useEffect } from 'react';
import {
  useParams,
  useNavigate,
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import Loader from 'shared/styles/Loader/loader';

import { getDetailsMovie } from 'shared/styles/services/movieApi';
import PropTypes from 'prop-types';

import css from '../MovieDetailsPage/movieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [date, setDate] = useState('');
  const { movieId } = useParams();

  // ф-я navigate примусово змінює адресу
  const navigate = useNavigate();

  const location = useLocation();
  //  якщо state не null  і там є поле from - записуємо його - інакше головна сторінка
  const from = location.state?.from || '/';

  useEffect(() => {
    const fetchDetailsMovie = async () => {
      try {
        setLoading(true);
        const result = await getDetailsMovie(movieId);
        setMovies(result);
        setGenres(result.genres);
        setDate(result.release_date);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailsMovie();
  }, [movieId]);

  const goBack = () => navigate(from);

  const elements = genres.map(({ name, id }) => (
    <li key={id} className={css.genresItems}>
      {name}
    </li>
  ));
  const year = new Date(date).getFullYear();
  const { poster_path, original_title, overview } = movies;

  return (
    <>
      <button className={css.btnGoBack} onClick={goBack} type="button">
        <HiArrowNarrowLeft /> Go back
      </button>
      {loading && <Loader />}
      {error && <p>Error</p>}
      {movies && (
        <div className={css.wrapperOneFilm}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300/` + poster_path
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            width="300"
            height="450"
            alt={original_title}
            loading="lazy"
          />
          <div className={css.wrapperDetails}>
            <h2>
              {original_title} <span>({year})</span>
            </h2>
            <p>User score: {((movies.vote_average / 10) * 100).toFixed(0)}%</p>
            <h3 className={css.titleDetails}>Overview</h3>
            <p>{overview}</p>
            <h3 className={css.titleDetails}>Genres</h3>
            <ul className={css.genresList}>{elements}</ul>
          </div>
        </div>
      )}
      <div className={css.wrapperMoreInfo}>
        <p>Additional information</p>
        <ul className={css.additionalList}>
          <li>
            <Link className={css.details} to="cast" state={{ from }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from }}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};
export default MovieDetailsPage;

MovieDetailsPage.defaultProps = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};