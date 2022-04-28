import React, {Fragment, useContext} from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import DoctorContext from '../../context/doctor/doctorContext';

const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const doctorContext = useContext(DoctorContext);

    const {isAuthenticated,logout, user} = authContext;
    const {clearPredictions} = doctorContext;

    const onLogout = () => {
        logout();
        clearPredictions();
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href='/login/Doctor'>
                    <i className='fas fa-sign-out-alt'></i> <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register/Doctor'>Register</Link>
            </li>
            <li>
                <Link to='/login/Doctor'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
};

Navbar.prototypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: 'Cardiac Arrest Prediction',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;
