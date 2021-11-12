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
<div className="overflow-x-hidden bg-white">
    <div className="px-6 py-8">
        <div className="container flex justify-between mx-auto">
            <div className="w-full lg:w-8/12">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-700 md:text-2xl ml-12 ">Posts</h1>
                    <div>
                        <a href="/newPost/" className="mr-12 rounded-lg border-2 bg-black border-black text-white hover:bg-blue-600 hover:border-blue-600 p-2">CREATE NEW POST</a>
                    </div>
                </div>
                <Feed />
            </div>
            <RhythmFilter />
        </div>
    </div>
    
</div>
<div className="mt-8 ml-16">
                    <div className="flex">
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-white bg-black rounded-md cursor-not-allowed">
                            PREVIOUS
                        </a>
                    
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-white bg-black rounded-md hover:bg-blue-600 hover:text-white">
                            1
                        </a>
                    
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-white bg-black rounded-md hover:bg-blue-600 hover:text-white">
                            2
                        </a>
                    
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-white bg-black rounded-md hover:bg-blue-600 hover:text-white">
                            3
                        </a>
                    
                        <a href="#" className="px-3 py-2 mx-1 font-medium text-white bg-black rounded-md hover:bg-blue-600 hover:text-white">
                            NEXT
                        </a>
                    </div>
                </div>
</>
          )}
</main>
  );
};

export default Home;
