import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import {useNavigate} from 'react-router-dom';

const PatientRegister = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    
    const {setAlert} = alertContext;
    const {registerPatient, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated){
            navigate('/');
        }

        if(error === 'Patient already exists'){
            setAlert(error,'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    },[error,isAuthenticated]);

    const [pat, setPat] = useState({
        name: '', 
        email: '',
        password: '',
        confirmp:'',
        dob:'',
        phone: ''
    });

    const {name, email, password, confirmp, dob, phone} = pat;

    const onChange = e => setPat({...pat, [e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(name === '', email === '', password === '', dob === '', phone === ''){
            setAlert('Please enter all Fields','danger');
        } else if (password!==confirmp){
            setAlert('Passwords do not match', 'danger');
        } else{
            registerPatient({
                name,
                email,
                password,
                dob,
                phone
            });
        }
    };

    return(
        <div className='form-container'>
            <h1>Account <span className='text-primary'>Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={name} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name='email' value={email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required minLength='6'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmp'>Confirm Password</label>
                    <input type='password' name='confirmp' value={confirmp} onChange={onChange} required minLength='6'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='dob'>Date of Birth</label>
                    <input type='date' name='dob' value={dob} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='phone'>Contact Number</label>
                    <input type='text' name='phone' value={phone} onChange={onChange} required/>
                </div>
                <input type='submit' value='Register' className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default PatientRegister;