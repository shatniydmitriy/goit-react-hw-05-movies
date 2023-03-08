import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Notify } from 'notiflix';
import Loader from 'shared/styles/Loader/loader';

import MoviesSearchForm from 'modules/MoviesSearchForm/MoviesSearchForm';
import MoviesList from 'modules/MoviesList/MoviesList';
import { getSearchMovie } from 'shared/styles/services/movieApi';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchSearchMovie = async () => {
      try {
        setLoading(true);
        const data = await getSearchMovie(query);
        data.length === 0
          ? Notify.info('There are no movies for your request')
          : setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchMovie();
  }, [query]);

  const onSearchMovie = ({ query }) => {
    if (query.trim() === '') {
      Notify.info('Enter name movie');
    }
    setMovies([]);
    setSearchParams({ query });
  };

  return (
    <>
      <MoviesSearchForm onSubmit={onSearchMovie} />
      {movies.length > 0 && <MoviesList movies={movies} />}
      {error && <p>{error}</p>}
      {loading && <Loader />}
    </>
  );
};
export default MoviesPage;