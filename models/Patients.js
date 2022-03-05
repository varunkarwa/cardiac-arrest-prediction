const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
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
    dob:{
        type:Date,
        required: true
    },
    phone:{
        type:String
    }
})

module.exports = mongoose.model('patient',PatientSchema)