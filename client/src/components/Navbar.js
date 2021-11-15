import React from 'react';
import { Redirect, Link } from 'react-router-dom';


import Auth from '../utils/auth';

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    return <Redirect to="/login" />;
  };
  return (
    
<div>
    {Auth.loggedIn() ? (
        <>

   
    <nav className="flex justify-center bg-yellow-500 text-white w-screen">
      <div className="px-5 xl:px-10 py-4 flex  w-full items-center">
        <a className="text-3xl font-bold font-heading" href="#">
        <img src="LOGO.png"></img>
        </a>
        
        <div className="hidden md:flex px-2 mx-auto font-semibold font-heading space-x-16 xl:px-10">
          <input type="text" name="" data-value="{{post.id}}" id="comment" placeholder="Search..." className="searchbar text-black px-4 h-10 rounded-full bg-gray-200 mt-2 border focus:border-black focus:bg-white focus:outline-none " autofocus autocomplete="true" required />
        </div>
        
        <div className="hidden md:flex font-semibold font-heading mr-1 space-x-10 xl:px-10">
          <div><Link to="/" className="w-1/6 h-1/6"><img src="rss-feed-symbol.png" title="Dashboard"className="w-7 h-7"></img></Link></div>
          <div><Link to={`/profile/${Auth.getProfile().data.userName}`} className="w-1/6 h-1/6"><img src="user.png" title="Profile" className="w-8 h-8"></img></Link></div>
          <div><Link id="logout" to="/" onClick={logout} className="w-1/6 h-1/6"><img src="log-out.png" title="Logout" className="w-8 h-8"></img></Link></div>
      </div>
      </div>
          </nav>

        </>
    ) : (
        <>
        </>
        )}

</div>

  )};

export default Navbar;
