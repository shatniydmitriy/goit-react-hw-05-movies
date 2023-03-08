import { useState, useEffect } from 'react';
import MoviesList from 'modules/MoviesList/MoviesList';
import { getPopularMovie } from 'shared/styles/services/movieApi';
import Loader from 'shared/styles/Loader/loader';
const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovie = async () => {
      try {
        setLoading(true);
        const result = await getPopularMovie();
        setMovies(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMovie();
  }, [setLoading, setMovies, setError]);

  return (
    <div>
      {movies.length > 0 && <MoviesList movies={movies} />}
      {loading && <Loader />}
      {error && <p>Movies load failed</p>}
    </div>
  );
};
export default TrendingMovies;