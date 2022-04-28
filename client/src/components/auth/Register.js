import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import {useNavigate, useParams} from 'react-router-dom';
import PatientRegister from './PatientRegister';

const Register = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const {type} = useParams();
    const {setAlert} = alertContext;
    const {registerDoc, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated){
            navigate('/');
        }

        if(error === 'Doctor already exists'){
            setAlert(error,'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    },[error,isAuthenticated]);

    const [doc, setDoc] = useState({
        name: '', 
        email: '',
        password: '',
        confirmp:'',
        specialization: '', 
        hospital: '', 
        phone: ''
    });

    const {name, email, password, confirmp, specialization, hospital, phone} = doc;
    const Registertext = `Register as ${type === 'Doctor' ? 'Patient' : 'Doctor'} `

    const onChange = e => setDoc({...doc, [e.target.name]:e.target.value});

    const onClick = () => navigate(type === 'Doctor' ? '/register/Patient' : '/register/Doctor')

    const onSubmit = e => {
        e.preventDefault();
        if(name === '', email === '', password === '', specialization === '', hospital === '', phone === ''){
            setAlert('Please enter all Fields','danger');
        } else if (password!==confirmp){
            setAlert('Passwords do not match', 'danger');
        } else{
            registerDoc({
                name,
                email,
                password,
                specialization,
                hospital,
                phone
            });
        }
    };

    return(
        <div>
        {type==='Patient' ?
        <PatientRegister /> :
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
                    <label htmlFor='specialization'>Specialization</label>
                    <input type='text' name='specialization' value={specialization} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='hospital'>Hospital</label>
                    <input type='text' name='hospital' value={hospital} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='phone'>Contact Number</label>
                    <input type='text' name='phone' value={phone} onChange={onChange} required/>
                </div>
                <input type='submit' value='Register' className='btn btn-primary btn-block' />
            </form>
        </div>}
        <input type='button' value={Registertext} className='btn btn-primary btn-block' onClick={onClick} />                                    
        </div>
    )
}

export default Register;