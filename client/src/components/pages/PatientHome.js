import React, { useContext, useEffect } from 'react';
import Predicitions from '../patient/Predictions';
import PredictionsFilter from '../patient/PredictionsFilter';
import AuthContext from '../../context/auth/authContext';

const PatientHome = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadPatient();
        //eslint-diasble-next-line
    },[]);

    return(
        <div className='grid-2'>
            <div>
                <PredictionsFilter />
                <Predicitions />
            </div>
        </div>
    )
}

export default PatientHome;