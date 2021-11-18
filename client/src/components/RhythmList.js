import React, {useState} from 'react';
import { QUERY_RHYTHMS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { MultiSelect } from "react-multi-select-component";

const RhythmList = ({preSel}) => {

  let rhythmSel = []
    if (preSel){
      rhythmSel = preSel.map((instrument) =>{ return {
        value: instrument._id,
        label: instrument.name
    }})}

    const [selected, setSelected] = useState(rhythmSel);
    const { loading, data } = useQuery(QUERY_RHYTHMS);



    if (loading) {
        return <div>Loading...</div>;
      }

      const rhythms = data.rhythms.map((rhythm) =>{ return {
        value: rhythm._id,
        label: rhythm.name
    }})

  return ( 
<div className="w-1/3">
<MultiSelect 
        options={rhythms}
        name="rhythms"
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
/>
</div>

)
  };
  export default RhythmList;