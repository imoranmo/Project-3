import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import { QUERY_POSTS } from '../utils/queries';

import Auth from '../utils/auth';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];

    const loading = false
  if (!Auth.loggedIn()) {
    return <Redirect to="/signup" />;
  }

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (

            <h1>You made it home</h1>

          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
