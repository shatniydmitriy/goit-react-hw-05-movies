import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getReviewsMovie } from 'shared/styles/services/movieApi';

import css from '../ReviewsPage/reviewsPage.module.css';

const ReviewsPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviewsMovie = async () => {
      try {
        setLoading(true);
        const results = await getReviewsMovie(movieId);
        
        setMovies(results);
      } catch ({ response }) {
        setError(response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewsMovie();
  }, [movieId, error]);

  const elements = movies.map(({ id, author, content }) => (
    <li key={id}>
      <p className={css.author}>Author: {author}</p>
      <p>{content}</p>
    </li>
  ));

  return (
    <>
      {loading && <p>...loading</p>}
      {error && <p>Error</p>}
      {movies.length !== 0 && (
        <div>
          <ul>{elements}</ul>
        </div>
      )}
      {movies.length === 0 && (
        <div>We don't have any reviews for this movie</div>
      )}
    </>
  );
};
export default ReviewsPage;

ReviewsPage.defaultProps = {
  movies: [],
};

ReviewsPage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};