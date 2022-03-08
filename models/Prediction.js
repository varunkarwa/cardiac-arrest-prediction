const mongoose = require('mongoose');

const PredictionSchema = mongoose.Schema({
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors'
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patients'
    },
    age:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    sex:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    //chestpain
    cp:{ 
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    trestbps:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    chol:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    fbs:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    restecg:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    thalach:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    exang:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    oldpeak:{
        type:mongoose.Types.Decimal128,
        required:true
    },
    slope:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    ca:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    thal:{
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    target:{
        type     : Number
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('predictions',PredictionSchema);