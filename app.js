require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');


const app = express();
app.use(express.json());  
app.use(cors());

const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
    console.log("Database connected...");
});

app.use('/users', userRoutes);

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log("Server started on port 9000");
});