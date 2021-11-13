import React from 'react';
import { QUERY_INSTRUMENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const InstrumentList = () => {

    const { loading, data } = useQuery(QUERY_INSTRUMENTS);


  return (
<>
    <div class="flex items-center space-x-3 font-bold text-gray-700 text-2xl leading-8 mb-4">
        <span>Instruments</span>
    </div>
    <div class="bg-white p-1 rounded-lg shadow-lg">
        <div class="flex items-center space-x-3 font-semibold text-gray-900 text-2xl leading-8 mb-4 underline">
        </div>
        <div class="grid grid-cols-3 gap-1 mb-2">
            <div class="rounded-lg bg-yellow-500 text-center">Banjo</div>
        </div>
    </div>
</>
  )};

  export default InstrumentList;