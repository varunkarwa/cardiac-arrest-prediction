import React, { Fragment, useContext, useEffect } from 'react';
import PatientContext from '../../context/patient/patientContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import PredictionItem from './PredictionItem';

const Predictions = () => {

    const patientContext = useContext(PatientContext);

    const {predictions,
        filtered, loading,
        getPredictions,
        clearFilter} = patientContext;

    useEffect(() => {
        getPredictions();
        //eslint-diable-next-line
    },[]);

    if(predictions && predictions.length===0 && !loading){
        return <h4>There is no prediction done for you</h4>
    }

  return (
      <Fragment>
        {predictions && !loading ?(
            <TransitionGroup>
                {filtered ? 
                    filtered.map(prediction => (
                        <CSSTransition key={prediction._id} timeput={500} className='item'>
                            <PredictionItem prediction={prediction}/>
                        </CSSTransition>
                    ))
                    : predictions.map(prediction =>(
                        <CSSTransition key={prediction._id} timeput={500} className='item'>
                            <PredictionItem prediction={prediction}/>
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        ):<Spinner />}
      </Fragment>
  )
}

export default Predictions;