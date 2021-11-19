import React from 'react';
import { QUERY_RHYTHMS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const RhythmFilter = () => {

    const { loading, data } = useQuery(QUERY_RHYTHMS);


  return (
    <div className="hidden w-1/3 lg:block border-solid border-black flex justify-end mt-20 ">
                  {loading ? (
            <div>Loading...</div>
          ) : (
    <div className="p-8">
        <h1 className="ml-8 mb-6 text-2xl font-bold text-gray-500 ">Sponsored</h1>
        <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
           
        </div>
    </div>)}
    </div>

)};

export default RhythmFilter;