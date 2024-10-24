const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});

const connectDB = require('./config/database');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
const stripeRoutes = require('./routes/stripe');

app.use('/api/users', userRoutes);
app.use('/api/stripe', stripeRoutes);

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});