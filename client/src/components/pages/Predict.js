import React, { useState, useContext } from 'react';
import DoctorContext from '../../context/doctor/doctorContext';
import AuthContext from '../../context/auth/authContext';
import {useParams, useNavigate} from 'react-router-dom';

const Predict = () => {

    const doctorContext = useContext(DoctorContext);
    const authContext = useContext(AuthContext);

    const {id} = useParams();
    const { predict } = doctorContext;
    const {user} = authContext;

    const [attributes, setAttributes] = useState({
            patient: id,
            doctor: user._id,
            age:'',
            sex:'',
            cp:'',
            trestbps:'',
            chol:'',
            fbs:'',
            restecg:'',
            thalach:'',
            exang:'',
            oldpeak:'',
            slope:'',
            ca:'',
            thal:''
    });


    const navigate = useNavigate();
    const {
    age,
    sex,
    cp,
    trestbps,
    chol,
    fbs,
    restecg,
    thalach,
    exang,
    oldpeak,
    slope,
    ca,
    thal} = attributes;

    const onChange = e => setAttributes({
        ...attributes,
        [e.target.name]:e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        predict(attributes);
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={onSubmit} >
            <h2 className='text-primary'>Predict Cardiac Arrest</h2>
            <input 
                type='text'
                placeholder='Age'
                name='age'
                value={age}
                onChange={onChange}
            />
            <h5>Sex</h5>
            <input 
                type='radio' 
                name='sex' 
                value='1' 
                checked={sex === '1'} 
                onChange={onChange}/
            > Male{' '}
            <input 
                type='radio' 
                name='type' 
                value='0' 
                checked={sex === '0'} 
                onChange={onChange}/
            > Female
            <h5>Chest Pain Type</h5>
            <input 
                type='radio' 
                name='cp' 
                value='0' 
                checked={cp === '0'} 
                onChange={onChange}/
            > Assymptomatic{' '}
            <input 
                type='radio' 
                name='cp' 
                value='1' 
                checked={cp === '1'} 
                onChange={onChange}/
            > Atypical Angina{' '}
            <input 
                type='radio' 
                name='cp' 
                value='2' 
                checked={cp === '2'} 
                onChange={onChange}/
            > Non-Anginal Pain{' '}
            <input 
                type='radio' 
                name='cp' 
                value='3' 
                checked={cp === '3'} 
                onChange={onChange}/
            > Typical Anginal
            <input
                type='text'
                name='trestbps'
                placeholder='Patient resting blood pressure'
                value={trestbps}
                onChange={onChange}
            />
            <input 
                type='text'
                name='chol'
                placeholder='Cholestrol'
                value={chol}
                onChange={onChange}
            />
            <h5>Patient's Fasting Blood Pressure `(True for greater than 120mg/dl)`</h5>
            <input 
                type='radio'
                name='fbs'
                value='1'
                checked={fbs==='1'}
                onChange={onChange}
            /> True {' '}
            <input 
                type='radio'
                name='fbs'
                value='0'
                checked={fbs==='0'}
                onChange={onChange}
            /> False
            <h5>Resting Electrocardiagraphic Results</h5>
            <input 
                type='radio'
                name='restecg'
                value='0'
                checked={restecg==='0'}
                onChange={onChange}
            />Probable or Definite Left Venticular Hypertrophy by Estes' Criteria
            <input 
                type='radio'
                name='restecg'
                value='1'
                checked={restecg==='1'}
                onChange={onChange}
            />Normal{' '}
            <input 
                type='radio'
                name='restecg'
                value='2'
                checked={restecg==='2'}
                onChange={onChange}
            />Having ST-T Wave Abnormality
            <input 
                type='text'
                name='thalach'
                value={thalach}
                placeholder="Patient's Maximum Heart Rate Achieved"
                onChange={onChange}
            />
            <h5>Exercise Induced Angina</h5>
            <input 
                type='radio'
                name='exang'
                value='1'
                checked={exang==='1'}
                onChange={onChange}
            />Yes{' '}
            <input 
                type='radio'
                name='exang'
                value='0'
                checked={exang==='0'}
                onChange={onChange}
            />No
            <input 
                type="text"
                name="oldpeak"
                value={oldpeak}
                placeholder='ST Depression Induced by Exercise Relative to Net'
                onChange={onChange}
            />
            <h5>Slope of the peak Exercise ST Segmennt</h5>
            <input 
                type='radio'
                name='slope'
                value='0'
                checked={slope==='0'}
                onChange={onChange}
            />Down SLoping{' '}
            <input 
                type='radio'
                name='slope'
                value='1'
                checked={slope==='1'}
                onChange={onChange}
            />Flat{' '}
            <input 
                type='radio'
                name='slope'
                value='2'
                checked={slope==='2'}
                onChange={onChange}
            />Down Sloping

            <h5>Number of Major Vessels</h5>
            <input 
                type='radio'
                name='ca'
                value='0'
                checked={ca==='0'}
                onChange={onChange}
            />0{' '}
            <input 
                type='radio'
                name='ca'
                value='1'
                checked={ca==='1'}
                onChange={onChange}
            />1{' '}
            <input 
                type='radio'
                name='ca'
                value='2'
                checked={ca==='2'}
                onChange={onChange}
            />2{' '}
            <input 
                type='radio'
                name='ca'
                value='3'
                checked={ca==='3'}
                onChange={onChange}
            />3

            <h5>A Blood disorder 'Thalassemia'</h5>
            <input 
                type='radio'
                name='thal'
                value='1'
                checked={thal==='1'}
                onChange={onChange}
            />Fixed Defect{' '}
            <input 
                type='radio'
                name='thal'
                value='2'
                checked={thal==='2'}
                onChange={onChange}
            />Normal Blood Flow{' '}
            <input 
                type='radio'
                name='thal'
                value='3'
                checked={thal==='3'}
                onChange={onChange}
            />Blood flow observed but not normal

            <div>
                <input 
                    type='submit' 
                    value='Predict'
                    className='btn btn-primary btn-block'
                />
            </div>
        </form>
    </div>
    )}

export default Predict;