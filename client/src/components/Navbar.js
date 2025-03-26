// En enkel navigationsmeny (navbar) som använder React Router för att länka till olika sidor i webbshopen: 
// Hem (/), Produkter (/products), Varukorg (/cart) och Admin (/admin)
// Vi använder oss av bootstrap https://getbootstrap.com/docs/5.3/components/navbar/

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Min Webbutik</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Hem</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Produkter</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Varukorg</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/admin">Admin</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;