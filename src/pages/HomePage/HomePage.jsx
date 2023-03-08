import TrendingMovies from '../../modules/TrendingMovies/TrendingMovies';
import css from '../HomePage/homePage.module.css';

const HomePage = () => {
  return (
    <main>
      <div className="container">
        <h2 className={css.titleTrending}>Trending today</h2>
        <TrendingMovies />
      </div>
    </main>
  );
};
export default HomePage;