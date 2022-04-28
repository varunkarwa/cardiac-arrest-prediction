import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DoctorContext from '../../context/doctor/doctorContext';
import {useNavigate} from 'react-router-dom';

const PatientlistItem = ({patient,history}) => {

    const doctorContext = useContext(DoctorContext);
    const [pred,setPred] = useState({});
    const {predictions, getPredictions} = doctorContext;

    const navigate = useNavigate();
    
    const {
        _id,
        name,
        email,
        dob,
        phone} = patient;
        console.log(pred);

    useEffect(() => {
        getPredictions();
        if(predictions && predictions.length>0)
            setPred(predictions.filter(prediction => prediction.patient === _id))
        //eslint-disable-next-line
    },[predictions])
    

    return(
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' + 
                        (pred.length>0 ? (pred[0].target === 0 ? 'badge-success':'badge-danger') : 'badge-primary')
                    }
                >
                    {(pred.length>0 ? (pred[0].target === 0 ? 'Patient was Healthy!':'Last time Prone to Cardiac Arrest') : 'No Previous Predictions')}
                </span>
            </h3>
            <ul className='list'>
                {email && (<li>
                    <i className='fas fa-envelope-open'></i> {email}
                </li>)}
                {dob && (<li>
                    <i className='fas fa-envelope-open'></i> {dob}
                </li>)}
                {phone && (<li>
                    <i className='fas fa-phone'></i> {phone}
                </li>)}
            </ul>
            <button className='btn btn-dark btn-sm' onClick={() => navigate(`/predict/${_id}`) }>Predict </button>
        </div>
    )
};

PatientlistItem.protoTypes = {
    prediction: PropTypes.object.isRequired
}

export default PatientlistItem;