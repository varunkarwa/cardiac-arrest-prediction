const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    hospital:{
        type: String,
        required: true
    },
    specialization:{
        type: String,
        required: true
    },
    phone:{
        type:String
    }
})

module.exports = mongoose.model('doctor',DoctorSchema)