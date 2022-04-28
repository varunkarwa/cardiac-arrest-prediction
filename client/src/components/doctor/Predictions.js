import React, {Fragment, useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import DoctorContext from '../../context/doctor/doctorContext';
import PredictionItem from './PredictionItem';
import Spinner from '../layout/Spinner';

const Predictions = () => {
    const doctorContext = DoctorContext;

    const {predictions, filteredPredictions, getPredictions, loading} = useContext(doctorContext);

    useEffect(() =>{
        getPredictions();
        console.log(predictions);
        //eslint-disable-next-line
    },[]);

    if(predictions !==null && predictions.length === 0 && !loading){
        return <h4>Please predict the cardiact arrest for some Patient</h4>
    }

    return(
        <Fragment>
            {predictions && !loading ? (
                <TransitionGroup>
                    {filteredPredictions 
                        ? filteredPredictions.map(prediction => (
                            <CSSTransition key={prediction._id} timeout={500} classNames='item'>
                                <PredictionItem  prediction={prediction}/>
                            </CSSTransition>))
                        : predictions && predictions.map(prediction => (
                            <CSSTransition key={prediction._id} timeout={500} classNames='item'>
                                <PredictionItem  prediction={prediction}/>
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : <Spinner />}
        </Fragment>
    )
}

export default Predictions;