import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location: { pathname } }) => {
  const links = [
    {
      title: 'ceremonies',
      path: '/ceremonies'
    },
    {
      title: 'truth booths',
      path: '/truthbooths'
    }
  ];
  return (
    <div className="navcontainer">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top">
        <ul className="navbar-nav mr-auto">
          {links.map(link => (
            <li key={link.path}>
              <div className="nav-button">
                <Link
                  to={link.path}
                  className={`nav-link${
                    link.path.includes(pathname) ? ' active' : ''
                  }`}
                >
                  {link.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
