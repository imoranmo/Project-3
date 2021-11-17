import React from 'react';
import { QUERY_INSTRUMENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { MultiSelect } from "react-multi-select-component";

const InstrumentList = () => {

    const [selected, setSelected] = useState([]);
    const { loading, data } = useQuery(QUERY_INSTRUMENTS);


  return (
<>

<MultiSelect> 
        type="date"
        options={instrumentData.instruments}
        name="instruments"
        value={selected}
        onChange={setSelected}
    <MultiSelect/>
</>
  )};

  export default InstrumentList;