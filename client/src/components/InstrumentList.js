import React, {useState} from 'react';
import { QUERY_INSTRUMENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { MultiSelect } from "react-multi-select-component";

const InstrumentList = () => {

    const [selected, setSelected] = useState([]);
    const { loading, data } = useQuery(QUERY_INSTRUMENTS);


    if (loading) {
        return <div>Loading...</div>;
      }

  return ( 

<MultiSelect 
        type="date"
        options={data.instruments}
        name="instruments"
        value={selected}
        onChange={setSelected}
/>


)
  };
  export default InstrumentList;