import React, {Fragment, useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import DoctorContext from '../../context/doctor/doctorContext';
import PatientlistItem from './PatientlistItem';
import Spinner from '../layout/Spinner';

const PatientList = () => {
    const doctorContext = useContext(DoctorContext);

    const {patientlist, filteredPatientList, getPatientlist, loading} = doctorContext;

    useEffect(() => {
        getPatientlist();

        //eslint-disable-next-line
    },[]);

    if(patientlist && patientlist.length==0 && !loading){
        return <h4>Please Register a Patient!</h4>
    }

    return(
        <Fragment>
            {(patientlist && !loading) ? (
                <TransitionGroup>
                     {filteredPatientList ? 
                        filteredPatientList.map(patient => (
                            <CSSTransition key={patient._id} timeout={500} classNames='item'>
                                <PatientlistItem patient={patient} />
                            </CSSTransition>))
                        : patientlist && patientlist.map(patient => (
                            <CSSTransition key={patient._id} timeout={500} classNames='item'>
                                <PatientlistItem patient={patient} />
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : <Spinner /> }
        </Fragment>    
    )
}

export default PatientList;