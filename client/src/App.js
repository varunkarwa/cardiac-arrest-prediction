import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute'
import Predict from './components/pages/Predict';
import PatientHome from './components/pages/PatientHome';

import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import PatientState from './context/patient/PatientState';
import DoctorState from './context/doctor/DoctorState';
import setAuthToken  from './utils/setAuthToken';
import './App.css';

if(localStorage.token){
    setAuthToken(localStorage.token);
}


const App = () => {

    return(
        <AuthState>
            <DoctorState>
                <PatientState>
                    <AlertState>
                        <Router >
                            <Fragment>
                                <Navbar />
                                <div className='container'>
                                    <Alerts/>
                                    <Routes>
                                        <Route exact path='/'  element={<PrivateRoute />} >
                                            <Route exact path='/' element={<Home />} />
                                        </Route>
                                        <Route exact path='/about' element={<About />} />
                                        <Route exact path='/register/:type' element={<Register />} />
                                        <Route exact path='/login/:type' element={<Login />} />
                                        <Route exact path='/predict/:id' element={<Predict />} />
                                        <Route exact path='/mypredictions' element={<PrivateRoute/>}>
                                            <Route exact path='/mypredictions' element={<PatientHome/>} />
                                        </Route>
                                    </Routes>
                                </div>
                            </Fragment>
                        </Router>
                    </AlertState>
                </PatientState>
            </DoctorState>
        </AuthState>
    )
}

export default App;