const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});

const app = express();

// Configuration de production
if (process.env.NODE_ENV === 'production') {
    // Compression pour optimiser les performances
    app.use(compression());
    
    // Sécurité avec helmet
    app.use(helmet());
    
    // Rate limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limite chaque IP à 100 requêtes par fenêtre
    });
    app.use(limiter);
}

// Middleware standard
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal Server Error' 
            : err.message
    });
});

// Démarrage
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});