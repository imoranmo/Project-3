import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import RhythmFilter from '../components/RhythmFilter';
import Feed from '../components/Feed';



import Auth from '../utils/auth';

const Home = () => {
    const loading = false
      if (!Auth.loggedIn()) {
        return <Redirect to="/login" />;
      }

  return (
    <main>
          {loading ? (
            <div>Loading...</div>
          ) : (
<>

    <div className="px-6 py-8 items-center w-screen">
        <div className="container flex justify-between mx-auto">
            <div className="w-full xl:w-2/3 bg-green-200 w-screen">
                <div className="p-6 flex items-center justify-between ">
                    <h1 className="mb-4 text-2xl font-bold text-gray-700">Posts</h1>
                        <a href="/Post/new" className="rounded-lg border-2 bg-black border-black text-white hover:bg-blue-600 hover:border-blue-600 p-2 font-medium">CREATE NEW POST</a>
                </div>
                <Feed />
            </div>
            <RhythmFilter />
        </div>
</div>
</>
          )}
</main>
  );
};

export default Home;
