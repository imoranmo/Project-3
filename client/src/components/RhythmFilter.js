import React from 'react';
import { QUERY_RHYTHMS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const RhythmFilter = () => {

    const { loading, data } = useQuery(QUERY_RHYTHMS);


  return (
    <div className="hidden w-1/4 lg:block border-solid border-black flex justify-end bg-yellow-100 ">
                  {loading ? (
            <div>Loading...</div>
          ) : (
    <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-700 ">Rhythms</h1>
        <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
            <ul>                      
                <li style={{listStyle:'none'}}>
                    <label className="inline-flex items-center mt-3">
                     {data.rhythms.map((rhythm) => {
                            return (<><input id='rhythmFilter' data-value='{{id}}' type="checkbox" className="form-checkbox h-5 w-5 text-gray-600"/><span className="ml-2 text-gray-700">{rhythm.name}</span></>)
                        })}  
                    </label>
                </li>
                <button type="submit" className="rounded-lg w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-blue-600 hover:shadow-none" id='updResults'>Filter</button>
            </ul>
        </div>
    </div>)}
    </div>

)};

export default RhythmFilter;