import React, { useContext, useRef, useEffect } from 'react';
import DoctorContext from '../../context/doctor/doctorContext';


const PatientlistFilter = () => {
    const doctorContext = useContext(DoctorContext);
    const {filterPatientList, clearFilterPL, filteredPatientlist} = doctorContext;
    const text = useRef('');

    useEffect(() => {
        if(filteredPatientlist === null){
            text.current.value = '';
        }
    });

    const onChange = e => {
        if(text.current.value !== ''){
            filterPatientList(e.target.value);
        }else{
            clearFilterPL();
        }
    }

    return (
        <form>
            <input ref={text} type='text' placeholder='Filter Patients...' onChange={onChange} />
        </form>
    )
}

export default PatientlistFilter;
