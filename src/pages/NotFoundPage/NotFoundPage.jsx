import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <div className="container">
      <h2>Page not found</h2>
      <Link to="/">To home page</Link>
    </div>
  );
};
export default NotFoundPage;