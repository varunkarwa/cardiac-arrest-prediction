import React, {useReducer} from 'react';
import axios from 'axios';
import DoctorContext from './doctorContext';
import doctorReducer from './doctorReducer';

const DoctorState = props => {
    const initialState = {
        patientlist: null,
        predictions: null,
        filteredPredictions: null,
        filteredPatientlist: null,
        error: null
    };

    const [state,dispatch] = useReducer(doctorReducer, initialState);
    const url='http://localhost:5000';

    //Get PatientList
    const getPatientlist = async () => {
        try{
            const res = await axios.get(`${url}/api/doctors/patients`);

            dispatch({
                type: 'GET_PATIENT_LIST',
                payload: res.data
            });
        } catch (err){
            
            dispatch({
                type: 'PREDICTION_ERROR',
                payload: 'Some error'
            })
        }
    }

    //Get Predictions
    const getPredictions = async () => {
        try{

            const res = await axios.get(`${url}/api/doctors/predictions`);
            
            dispatch({
                type: 'GET_PREDICTIONS',
                payload: res.data
            });
            
        } catch(err){
            dispatch({
                type:'PREDICITON_ERROR',
                payload: err.response.msg
            })
        }
    }

    //Predict Cardiac Chances
    const predict = async attributes => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const att = {
            ...attributes,
            age:parseInt(attributes.age),
            sex:parseInt(attributes.sex),
            cp:parseInt(attributes.cp),
            trestbps:parseInt(attributes.trestbps),
            chol:parseInt(attributes.chol),
            fbd:parseInt(attributes.fbd),
            restecg:parseInt(attributes.restecg),
            thalach:parseInt(attributes.thalach),
            exang:parseInt(attributes.exang),
            oldpeak:parseFloat(attributes.oldpeak),
            slope:parseInt(attributes.slope),
            ca:parseInt(attributes.ca),
            thal:parseInt(attributes.thal)
        }
        try{
            const res = await axios.post(`${url}/api/doctors/predict`, att, config);
            
            dispatch({
                type: 'PREDICT_CARDIAC_ARREST',
                payload: res.data
            });
        } catch(err){
            dispatch({
                type: 'PREDICTION_ERROR',
                payload: err.response.msg
            })
        }
    }

    //Filter PatientList
    const filterPatientList = text => {
        dispatch({ type: 'FILTER_PATIENT_LIST', payload: text });
    }

    //Filter Predictions
    const filterPredictions = text => {
        dispatch({
            type: 'FILTER_PREDICTIONS',
            payload: text
        });
    }

    const clearPredictions = () => {
        dispatch({
            type: 'CLEAR_PREDICTIONS'
        })
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: 'CLEAR_FILTER' });
    }

    //Clear Patienlist Filter
    const clearFitlerPL = () => {
        dispatch({type: 'CLEAR_FILTER_PL'})
    }

    return (
        <DoctorContext.Provider value={{
            patientlist: state.patientlist||[],
            predictions: state.predictions,
            filteredPredictions: state.filteredPredictions,
            filteredPatientlist: state.filteredPatientlist,
            error: state.error,
            getPatientlist,
            getPredictions,
            predict,
            filterPatientList,
            filterPredictions,
            clearPredictions,
            clearFitlerPL,
            clearFilter,
        }}> 
            { props.children }
        </DoctorContext.Provider>
    )
};

export default DoctorState;