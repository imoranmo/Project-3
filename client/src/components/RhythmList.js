import React, {useState, useEffect} from 'react';
import { QUERY_RHYTHMS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { MultiSelect } from "react-multi-select-component";

const RhythmList = ({filterList, filterHandle}) => {


    const { loading, data } = useQuery(QUERY_RHYTHMS);


    if (loading) {
        return <div>Loading...</div>;
      }

      const allRhythms = data.rhythms.map((rhythm) =>{ return {
        value: rhythm._id,
        label: rhythm.name
    }})

  return ( 

<MultiSelect 
        options={allRhythms}
        name="rhythms"
        value={filterList}
        onChange={filterHandle}
        labelledBy="Select"
/>


)
  };
  export default RhythmList;