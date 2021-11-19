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
    <main className="w-screen">
          {loading ? (
            <div>Loading...</div>
          ) : (
<>
<div className="flex justify-center w-screen">
  <div className="w-full xl:w-1/2 w-screen mt-20 mb-6 ml-6 mr-10">
  <div className="p-8 flex items-center justify-between ">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-700">Posts</h1>
        <a href="/Post/new" className="rounded-lg border-2 bg-black border-black mr-6 text-white hover:bg-blue-600 hover:border-blue-600 p-2 font-medium">CREATE NEW POST</a>   
    </div>
    <Feed />
  </div>
  <RhythmFilter />
</div>
        
</>
          )}
</main>
  );
};

export default Home;
