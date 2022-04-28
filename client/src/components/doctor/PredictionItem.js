import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DoctorContext from '../../context/doctor/doctorContext';

const PredictionItem = ({prediction}) => {
    const doctorContext = useContext(DoctorContext);

    const {patientlist} = doctorContext;
    
    const {_id,patient,age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal,doctor,target,timestamp} = prediction;
    const [pat, setPat] = useState({});
    useEffect(() => {
        const p = patientlist.filter(pt => pt._id === patient);
        setPat(p[0]);
    },[prediction]);

    return(
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {pat && pat.name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' + 
                        (target === 0 ? 'badge-success':'badge-danger')
                    }
                >
                    {(target === 0 ? 'Patient is Healthy!':'Prone to Cardiac Arrest')}
                </span>
            </h3>
            <ul className='list'>
                {timestamp && (<li>
                    <i className='fas fa-envelope-open'></i> {timestamp}
                </li>)}
                {trestbps && (
                    <li>Resting Blood Pressure is {trestbps} which is {parseInt(trestbps)<120 ? (parseInt(trestbps)>80 ? 'Normal' : 'Lower than usual') : 'Higher than usual'} </li>
                )}
                {chol && (
                    <li>Cholestrol level is {chol} {parseInt(chol)<200 ? 'Keep this level' : 'You need to Contorl it!'} </li>
                )}
                {thalach && (
                    <li>Maximum Heart Rate Achieved is {thalach}. {(220-parseInt(age))>parseInt(thalach) ? 'It is in contorl' : 'It is above your expected heart beat range!' }</li>
                )}
            </ul>
        </div>
    )
};

PredictionItem.protoTypes = {
    prediction: PropTypes.object.isRequired
}

export default PredictionItem;