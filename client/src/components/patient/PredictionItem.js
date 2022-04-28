import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PatientContext from '../../context/doctor/doctorContext';

const PredictionItem = ({prediction}) => {
    // const doctorContext = useContext(DoctorContext);

    // const {patientlist} = doctorContext;
    const [doc,setDoc] = useState([]);
    useEffect(async () => {
        const response = await axios.get('https://localhost:5000/api/patients/doctor');
        setDoc(response.data.filter(d => d._id === doctor));
    },[prediction]);
    
    const {_id,patient,age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal,doctor,target,timestamp} = prediction;
    
    return(
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                Done By:{doc && doc.name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' + 
                        (target === 0 ? 'badge-success':'badge-danger')
                    }
                >
                    {(target === 0 ? 'You are Healthy!':'Prone to Cardiac Arrest')}
                </span>
            </h3>
            <ul className='list'>
                {timestamp && (<li>
                   Done on: <i className='fas fa-envelope-open'></i> {timestamp}
                </li>)}
                {cp && (
                    <li>
                        Chest Pain Type: {
                            parseInt(cp) !== 0 ? (parseInt(cp)!==1 ? (parseInt(cp)!==2 ? 'Typical Angina' : 'Non-Anginal Pain') : 'Atypical Pain') : 'Assymptomatic'  
                        }
                    </li>
                )}
                {trestbps && (
                    <li>Resting Blood Pressure is {trestbps} which is {parseInt(trestbps)<120 ? (parseInt(trestbps)>80 ? 'Normal' : 'Lower than usual') : 'Higher than usual'} </li>
                )}
                {chol && (
                    <li>Cholestrol level is {chol} {parseInt(chol)<200 ? 'Keep this level' : 'You need to Contorl it!'} </li>
                )}
                {fbs && (
                    <li>Fasting Blood Pressure is {parseInt(fbs) !==1 ? 'less than' : 'greater than'} 120</li>
                )}
                {restecg && (
                    <li>Resting Electrocardiagraphic Results is {parseInt(restecg) !==0 ? (parseInt(restecg) !==1 ? 'Having ST-T Wave Abnormality' : 'Normal') : "Probable or Definite Left Venticular Hypertrophy by Estes' Criteria" }</li>
                )}
                {thalach && (
                    <li>Maximum Heart Rate Achieved is {thalach}. {(220-parseInt(age))>parseInt(thalach) ? 'It is in contorl' : 'It is above your expected heart beat range!' }</li>
                )}
                {exang && (
                    <li>You {parseInt(exang) !== 1 ? 'dont have' : 'have'} Exercise Induced Angina </li>
                )}
                {oldpeak && (
                    <li>ST Depression Induced by Exercise Relative to Net is {oldpeak.$numberDecimal}. It is {parseFloat(oldpeak.$numberDecimal) < 0.1 ? 'normal range' : 'out of control!'}</li>
                )}
                {slope && (
                    <li>Slope of the peak Exercise ST Segment is {parseInt(slope) !== 0 ? (parseInt(slope) !== 1 ? 'Sloping' : 'Flat') : 'Down Slopping'}</li>
                )}
                {ca && (
                    <li>Number of Major Vessels is/are {ca}</li>
                )}
                {thal && (
                    <li>A Blood disorder 'Thalassemia': {parseInt(thal) !== 1 ? (parseInt(thal) !== 2 ? 'Blood flow observed but not normal' : 'Normal Blood Flow') : 'Fixed Defect'}</li>
                )}
            </ul>
        </div>
    )
};

PredictionItem.protoTypes = {
    prediction: PropTypes.object.isRequired
}

export default PredictionItem;