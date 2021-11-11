import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    

    try {

      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
      <div class="grid min-h-screen place-items-center">
        <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12  border-2 shadow-lg border-gray rounded-lg">
          <h1 class="text-3xl font-semibold text-center">Let's make music! ♪</h1>
          <h2 class="text-center">To create an account, please fill out the information below...</h2>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
            <form onSubmit={handleFormSubmit} className="mt-6">
              <span className="w-1/2">
                <label for="userName" className="block text-xs font-semibold text-gray-600 uppercase">User Name</label>
                <input onChange={handleChange} type="text" name="userName" placeholder="JOHNDOE" autocomplete="family-name" className="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
              </span>
                <div className="flex justify-between gap-3">
                    <span className="w-1/2">
                      <label for="firstName" className="block text-xs font-semibold text-gray-600 uppercase">First Name</label>
                      <input onChange={handleChange} type="text" name="firstName" placeholder="John" autocomplete="given-name" className="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                    </span>
                    <span className="w-1/2">
                      <label for="lastName" className="block text-xs font-semibold text-gray-600 uppercase">Last Name</label>
                      <input onChange={handleChange} type="text" name="lastName" placeholder="Doe" autocomplete="family-name" className="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                    </span>
                  </div>
                  <label for="email" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                  <input onChange={handleChange} type="email" name="email" placeholder="john.doe@emaildomain.com" autocomplete="email" className="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                  <label for="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                  <input onChange={handleChange} type="password" name="password" placeholder="********" autocomplete="new-password" className="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                  <label for="password-confirm" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirm Password</label>
                  <input onChange={handleChange} type="password" name="password-confirm" placeholder="********" autocomplete="new-password" className="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                  <button type="submit" className="rounded-lg w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-yellow-400 hover:shadow-none">Sign up</button>
                  <p className="mt-4 text-xs text-gray-500">Already registered? <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold underline">Log in.</a></p>
                </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
        </div>
      </div>
  );
};

export default Signup;
