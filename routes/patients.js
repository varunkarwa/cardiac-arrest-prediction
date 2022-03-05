const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult } = require('express-validator/check');

const Patient = require('../models/Patients');

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

module.exports = router;