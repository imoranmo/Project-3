import React, {useState} from 'react';
import { QUERY_INSTRUMENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { MultiSelect } from "react-multi-select-component";

const InstrumentList = ({preSel}) => {

    let instrumentSel = []
    if (preSel){
        instrumentSel = preSel.map((instrument) =>{ return {
        value: instrument._id,
        label: instrument.name
    }})}

    const [selected, setSelected] = useState(instrumentSel);
    const { loading, data } = useQuery(QUERY_INSTRUMENTS);



    if (loading) {
        return <div>Loading...</div>;
      }

      const instruments = data.instruments.map((instrument) =>{ return {
        value: instrument._id,
        label: instrument.name
    }})

  return ( 
<div className="w-1/3">
<MultiSelect 
        options={instruments}
        name="instruments"
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
/>
</div>

)
  };
  export default InstrumentList;