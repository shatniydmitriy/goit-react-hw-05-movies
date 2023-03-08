import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import items from './items';

import css from './menu.module.css';


const getClassName = ({ isActive }) => {
  const className = isActive ? `${css.link} ${css.active}` : css.link;
  return className;
};

const Menu = () => {
  const elements = items.map(({ id, text, link }) => (
    <li key={id}>
      <NavLink className={getClassName} to={link}>
        {text}
      </NavLink>
    </li>
  ));
  return (
    <nav>
      <div className={css.wrapper}>
        <ul className={css.menu}>{elements}</ul>
      </div>
    </nav>
  );
};
export default Menu;

Menu.defaultProps = {
  items: [],
};

Menu.proprTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};