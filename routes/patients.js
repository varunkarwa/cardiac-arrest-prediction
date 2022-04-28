const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/patient');
const config = require('config');
const {check, validationResult } = require('express-validator');

const Patient = require('../models/Patients');
const Doctor = require('../models/Doctors');
const Prediction = require('../models/Prediction');

// @route   POST api/patients
// @desc    Resgister a patient
// @access  Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min:6 }),
    check('dob','Date of Birth is required')
        .not()
        .isEmpty()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, dob, phone} = req.body;

    try { 
        let patient = await Patient.findOne({email});
        if(patient){
            return res.status(400).json({msg:'Patient already exists'});
        }
        patient = new Patient({name, email, password, dob, phone});
        const salt = await bcrypt.genSalt(10);
        patient.password = await bcrypt.hash(password, salt);
        await patient.save();

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


//@route Get api/patients
//@desc Get predicions
//Private
router.get('/predictions',auth,async (req,res) => {
    try{
        const predictions = await Prediction.find({patient:req.patient.id}).sort({timestamp:-1});
        res.json(predictions);
    }catch(err){
        res.status(500).send(err.message);
    }
})

// @route Get api/patients
// @desc Get patient
// Private 
router.get('/',auth,async (req,res) =>{
    try{
        console.log(req.patient);
        const patient = await Patient.findById({_id:req.patient.id});
        res.json(patient);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route Get api/doctor
// @desc Get doctor
// Private 
router.get('/doctor',auth, async (req,res) => {
    try{
        const doctor = await Doctor.find().sort({name:-1});
        res.json(doctor);
    }catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;