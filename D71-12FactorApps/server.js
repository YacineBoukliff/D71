const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});

const app = express();

// Middleware de base
app.use(express.json());

// Route simple pour tester
app.get('/', (req, res) => {
    res.json({ 
        message: 'FactorApp API is running',
        environment: process.env.NODE_ENV,
        port: process.env.PORT
    });
});

// Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Fonction de démarrage du serveur
const startServer = async (port) => {
    try {
        // Connexion MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
        
        // Démarrage du serveur
        return app.listen(port, () => {
            console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
        });
    } catch (error) {
        console.error('Server start failed:', error);
        process.exit(1);
    }
};

// Démarrage conditionnel
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    startServer(PORT);
}

module.exports = { app, startServer };