import React, { useContext, useRef, useEffect } from 'react';
import PatientContext from '../../context/patient/patientContext';


const PredictionsFilter = () => {
    const patientContext = useContext(PatientContext);
    const {filterPredictions, clearFilter, filtered} = patientContext;
    const text = useRef('');

    useEffect(() => {
        if(filtered === null){
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
            <input ref={text} type='text' placeholder='Search Predictions...' onChange={onChange} />
        </form>
    )
}

export default PredictionsFilter;
