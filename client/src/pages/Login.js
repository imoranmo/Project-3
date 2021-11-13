import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
  <section className="flex flex-col md:flex-row h-screen items-center">
    <div className="bg-white-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen p-24">
      <div className ="web-title text-4xl font-bold text-center">♪ A-LOTTA-RHYTHMS ♪</div>
      <div className = "desc text-xl colors-yellow-400 font-semibold text-center">Connect with other musicians, share your love of music and look for music related services. </div>
    </div>
    {data ? (
      <p>
        Success! You may now head{' '}
        <Link to="/">back to the homepage.</Link>
      </p>
    ) : (
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center">
        <div className="w-full h-100 border-2 shadow-lg rounded">
          <h1 className="greeting text-xl md:text-2xl font-bold leading-tight mt-12 text-center px-8"> WELCOME BACK! </h1>
          <form id='login-form' onSubmit={handleFormSubmit} className="mt-6 px-10">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input onChange={handleChange} type="email" name="email" id="email-login" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none " autoFocus autoComplete='true' required /> 
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input onChange={handleChange} type="password" name="password" id="password-login" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none" required />
            </div>
            <div className="text-right mt-2">
              <a href="/" className="text-xs font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full block bg-black hover:bg-blue-600 focus:bg-indigo-400 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6">Log In
            </button>
          </form>
          <p className="mt-8 text-center mb-12">Don't have an account yet? <a href="/signup" className="text-blue-500 hover:text-blue-700 font-semibold underline ">Register here.</a></p>
        </div>
      </div>
    )}

    {error && (
      <div className="my-3 p-3 bg-danger text-white">
        {error.message}
      </div>
    )}
  </section>
  );
};

export default Login;
