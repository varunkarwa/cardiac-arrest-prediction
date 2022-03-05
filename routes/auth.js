const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const doc_auth = require('../middleware/doctor');
const patient_auth = require('../middleware/patient');
const {check, validationResult } = require('express-validator/check');

const Doctor = require('../models/Doctors');
const Patient = require('../models/Patients');

// @route   Get api/auth/doctor
// @desc    Get logged in doctor
// @access  Private
router.get('/doctor',doc_auth,async (req,res) => {
    try{
        const doctor = await Doctor.findById(req.doctor.id).select('-password');
        res.json(doctor);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/doctor
// @desc    Auth user & get token
// @access  Public
router.post('/doctor', [
    check('email','Please include a valid Email').isEmail(),
    check('password','Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let doctor = await Doctor.findOne({email});
        if(!doctor){
            return res.status(400).json({ msg:' Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if(!isMatch){
            return res.status(400).json({ msg:' Invalid Credentials' });
        }

        const payload = {
            doctor: {
                id:doctor.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err,token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   Get api/auth/patient
// @desc    Get logged in patient
// @access  Private
router.get('/patient',patient_auth,async (req,res) => {
    try{
        const patient = await Patient.findById(req.patient.id).select('-password');
        res.json(patient);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/patient
// @desc    Auth user & get token
// @access  Public
router.post('/patient', [
    check('email','Please include a valid Email').isEmail(),
    check('password','Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let patient = await Patient.findOne({email});
        if(!patient){
            return res.status(400).json({ msg:' Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if(!isMatch){
            return res.status(400).json({ msg:' Invalid Credentials' });
        }

        const payload = {
            patient: {
                id:patient.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err,token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;