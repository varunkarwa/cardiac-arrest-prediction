import React, { useContext, useRef, useEffect } from 'react';
import DoctorContext from '../../context/doctor/doctorContext';


const PredictionsFilter = () => {
    const doctorContext = useContext(DoctorContext);
    const {filterPredictions, clearFilter, filteredPredictions} = doctorContext;
    const text = useRef('');

    useEffect(() => {
        if(filteredPredictions === null){
            text.current.value = '';
        }
    });

    const onChange = e => {
        if(text.current.value !== ''){
            filterPredictions(e.target.value);
        }else{
            clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type='text' placeholder='Filter Predictions...' onChange={onChange} />
        </form>
    )
}

export default PredictionsFilter;
