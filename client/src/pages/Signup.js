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
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
            <form onSubmit={handleFormSubmit} class="mt-6">
              <span class="w-1/2">
                <label for="userName" class="block text-xs font-semibold text-gray-600 uppercase">User Name</label>
                <input onChange={handleChange} type="text" name="userName" placeholder="JOHNDOE" autocomplete="family-name" class="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
              </span>
                <div class="flex justify-between gap-3">
                    <span class="w-1/2">
                      <label for="firstName" class="block text-xs font-semibold text-gray-600 uppercase">First Name</label>
                      <input onChange={handleChange} type="text" name="firstName" placeholder="John" autocomplete="given-name" class="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                    </span>
                    <span class="w-1/2">
                      <label for="lastName" class="block text-xs font-semibold text-gray-600 uppercase">Last Name</label>
                      <input onChange={handleChange} type="text" name="lastName" placeholder="Doe" autocomplete="family-name" class="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                    </span>
                  </div>
                  <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                  <input onChange={handleChange} type="email" name="email" placeholder="john.doe@emaildomain.com" autocomplete="email" class="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                  <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                  <input onChange={handleChange} type="password" name="password" placeholder="********" autocomplete="new-password" class="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                  <label for="password-confirm" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Confirm Password</label>
                  <input onChange={handleChange} type="password" name="password-confirm" placeholder="********" autocomplete="new-password" class="rounded-lg block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" required />
                  <button type="submit" class="rounded-lg w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-yellow-400 hover:shadow-none">Sign up</button>
                  <p class="mt-4 text-xs text-gray-500">Already registered? <a href="/login" class="text-blue-500 hover:text-blue-700 font-semibold underline">Log in.</a></p>
                </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
