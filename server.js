const express = require('express');
const connectDB = require('./config/db');
const cors=require('cors');
const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.get('/',(req,res) => 
    res.json({ msg: 'Welcome to the Cardiac Arrest Prediciton API...'})
)

app.use('/api/doctors',require('./routes/doctors'));
app.use('/api/patients',require('./routes/patients'));
app.use('/api/auth',require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));