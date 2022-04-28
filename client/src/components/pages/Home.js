import React, { useContext, useEffect } from 'react';
import Predicitions from '../doctor/Predictions';
import PatientList from '../doctor/PatientList';
import PredictionsFilter from '../doctor/PredictionsFilters';
import PatientlistFilter from '../doctor/PatientlistFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadDoctor();
        //eslint-diasble-next-line
    },[]);

    return(
        <div className='grid-2'>
            <div>
                <PatientlistFilter />
                <PatientList />
            </div>
            <div>
                <PredictionsFilter />
                <Predicitions />
            </div>
        </div>
    )
}

export default Home;