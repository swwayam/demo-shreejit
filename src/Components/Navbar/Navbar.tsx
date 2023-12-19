import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import {Link} from 'react-router-dom'
import { auth } from "../../firebaseConfig";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  const logout = () => {
    auth.signOut()
  }

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Demo App</Link>
        <form className="d-flex" role="search">
          {isLoggedIn ? (
            <>
              <Link to="/" onClick={logout} className="btn btn-outline-success mx-3">
                Sign Out
              </Link>
              <Link to="/dashboard" className="btn btn-outline-success">
                Dashboard
              </Link>
            </>
          ) : (
            <Link to="/signin" className="btn btn-outline-success mx-3" >
              Sign in
            </Link>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
