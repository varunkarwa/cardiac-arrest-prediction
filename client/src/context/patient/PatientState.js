import React, {useReducer} from 'react';
import axios from 'axios';
import PatientContext from './patientContext';
import patientReducer from './patientReducer';

const PatientState = props => {
    const initialState = {
        predictions: null,
        filtered: null,
        error: null
    };

    const [state,dispatch] = useReducer(patientReducer,initialState);

    const getPredictions = async () => {
        try{
            const res = await axios.get('http://localhost:5000/api/patients/predictions');

            dispatch({
                type:'GET_PREDICTIONS',
                payload: res.data
            });
        } catch(err){
            dispatch({ 
                type: 'PATIENT_ERROR',
                payload: err.response.msg
            });
        }
    }

    //Filter Predictions
    const filterPredictions = text => {
        dispatch({ type: 'FILTER_PREDICTIONS', payload: text });
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: 'CLEAR_FILTER' });
    }

    return (
        <PatientContext.Provider value={{
            predictions: state.predictions,
            filtered: state.filtered,
            error: state.error,
            getPredictions,
            filterPredictions,
            clearFilter
        }}>
            {props.children}
        </PatientContext.Provider>
    )
}

export default PatientState;