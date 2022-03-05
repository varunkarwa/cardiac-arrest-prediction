const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult } = require('express-validator/check');

const Doctor = require('../models/Doctors');

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

module.exports = router;