import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    
<div>
    {Auth.loggedIn() ? (
        <>
            <nav className="px-6 py-4 bg-yellow-500 shadow-lg rounded-sm">
                <span className="logo flex float-left">A-LOTTA-RHYTHMS</span>
                <div className="flex flex-row-reverse ..."></div>
                <div><Link id="logout" to="/" onClick={logout} className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 font-semibold text-lg underline">Logout</Link></div>
                <div><Link to="/profile" className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 font-semibold text-lg underline">Profile</Link></div>
                <div><Link to="/" className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 font-semibold text-lg underline">Feed</Link></div>
            </nav>
        </>
    ) : (
        <>
        </>
        )}

</div>

  )};

export default Navbar;
