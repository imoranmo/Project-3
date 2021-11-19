import React, {useState} from 'react';
import { QUERY_INSTRUMENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { MultiSelect } from "react-multi-select-component";

const InstrumentList = ({filterList, filterHandle}) => {

    // const [selected, setSelected] = useState();
    const { loading, data } = useQuery(QUERY_INSTRUMENTS);

    if (loading) {
        return <div>Loading...</div>;
      }

      const allInstruments = data.instruments.map((instrument) =>{ return {
        value: instrument._id,
        label: instrument.name
    }})

  return ( 

<MultiSelect 
        options={allInstruments}
        name="instruments"
        value={filterList}
        onChange={filterHandle}
        labelledBy="Select"
/>


)
  };
  export default InstrumentList;