import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import setAuthToken from '../../utils/setAuthToken';
import authReducer from './authReducer';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    const url='http://localhost:5000'

    // Load Doctor
    const loadDoctor = async () => {
        if(localStorage.token){;
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get(`${url}/api/auth/doctor`);

            dispatch({
                type:'DOCTOR_LOADED', 
                payload: res.data
            });
        } catch (err) {
            dispatch({type:'AUTH_ERROR'});
        }
    } ;

    // Register Doctor
    const registerDoc = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post(`${url}/api/doctors`, formData, config);

            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            });

            loadDoctor();
        } catch (err) {
            dispatch({
                type: 'REGISTER_FAIL',
                payload: err.response.data.msg
            });
        }
    };

    // Login Doctor
    const loginDoc = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post(`${url}/api/auth/doctor`, formData, config);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });

            loadDoctor();
        } catch (err) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response.data.msg
            });
        }
    };

    // Load Patient
    const loadPatient = async () => {
        if(localStorage.token){;
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get(`${url}/api/auth/patient`);

            dispatch({
                type:'PATIENT_LOADED', 
                payload: res.data
            });
        } catch (err) {
            dispatch({type:'AUTH_ERROR'});
        }
    } ;

    // Register Doctor
    const registerPatient = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post(`${url}/api/patients`, formData, config);

            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            });

            loadPatient();
        } catch (err) {
            dispatch({
                type: 'REGISTER_FAIL',
                payload: err.response.data.msg
            });
        }
    };

    // Login Patient
    const loginPatient = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post(`${url}/api/auth/patient`, formData, config);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });

            loadPatient();
        } catch (err) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response.msg
            });
        }
    };

    // Logout
    const logout = () => dispatch({type: 'LOGOUT'});

    // Clear Errors
    const clearErrors = () => dispatch({type: 'CLEAR_ERRORS'});

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            loadDoctor,
            registerDoc,
            loginDoc,
            loadPatient,
            registerPatient,
            loginPatient,
            logout,
            clearErrors
        }}> 
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthState;