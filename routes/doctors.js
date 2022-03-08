global.fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const doc_auth = require('../middleware/doctor');
const {check, validationResult } = require('express-validator/check');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const Doctor = require('../models/Doctors');
const Patient = require('../models/Patients');
const Prediction = require('../models/Prediction');

const loadmodel = async() => {
    return await tf.loadModel('file://model/model.json')
}

// @route   POST api/doctors
// @desc    Resgister a doctor
// @access  Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min:6 })
], 
async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, specialization, hospital, phone} = req.body;

    try { 
        let doctor = await Doctor.findOne({email});
        if(doctor){
            return res.status(400).json({msg:'Doctor already exists'});
        }
        doctor = new Doctor({name, email, password, specialization, hospital, phone});
        const salt = await bcrypt.genSalt(10);
        doctor.password = await bcrypt.hash(password, salt);
        await doctor.save();

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

// @route   GET api/patients
// @desc    Get all users patients
// @access  Private
router.get('/patients',doc_auth, async (req,res) => {
    try{
        const patients = await Patient.find().sort({name:1});
        res.json(patients);    
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/prdict
// @desc    Predict cardiac arrest chances
// @access  Private
router.post('/predict',[ doc_auth, [
    check('patient','Patient_Id is required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {patient,age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal}=req.body;
    try {
        const model = loadmodel();
        model.then( async function  (response) {
            const input = tf.tensor([[age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal]],[1,13],'float32');
            const target = response.predict(input).dataSync();
            
            const newPrediction = new Prediction({
                patient,
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
                thal,
                doctor: req.doctor.id,
                target: target[0]
            });
            
            const prediction = await newPrediction.save();
            res.json(prediction);
        },function(err){
            console.log(err);
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;