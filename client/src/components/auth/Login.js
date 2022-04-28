import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import {useNavigate, useParams} from 'react-router-dom'; 

const Login = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const {setAlert} = alertContext;

    const {loginDoc,loginPatient,error,clearErrors,isAuthenticated} = authContext;
    const {type} = useParams();
    const [user, setUser] = useState({
        email:'',
        password:''
    });
    const Logintext = `Login as ${type === 'Doctor' ? 'Patient' : 'Doctor'}`
    const navigate=useNavigate();
    useEffect(() => {
        if(isAuthenticated){
            type === 'Patient' ? navigate('/mypredictions') : navigate('/');
        }else if(error === 'Invalid Credentials'){
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    },[error, isAuthenticated, props.history])

    const {email, password} = user;

    const onChange = e => setUser({...user, [e.target.name]:e.target.value});

    const onClick = () => navigate(type === 'Doctor' ? '/login/Patient' : '/login/Doctor');

    const onSubmit = e => {
        e.preventDefault();
        if(email===''||password===''){
            setAlert('Please fill in all fields', 'danger');
        }else{
           type === 'Doctor' ? loginDoc({
                email,
                password
            }) : loginPatient({
                email,
                password
            });
        }
    }

    return(
        <div className='form-container'>
            <h1>Account <span className='text-primary'>Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name='email' value={email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required/>
                </div>
                <input type='submit' value='Login' className='btn btn-primary btn-block' />
                <input type='button' value={Logintext} className='btn btn-primary btn-block' onClick={onClick} />
            </form>
        </div>
    )
}

export default Login;