const express = require('express');
const router = express.Router();
const cacheService = require('../services/cache');
const User = require('../models/User');

// Liste des utilisateurs avec cache
router.get('/', async (req, res) => {
    try {
        // Vérifier le cache d'abord
        const cacheKey = 'users:all';
        const cachedUsers = await cacheService.get(cacheKey);
        
        if (cachedUsers) {
            console.log('Données récupérées du cache');
            return res.json(cachedUsers);
        }

        // Si pas en cache, récupérer de la base de données
        const users = await User.find().select('-password');
        // Stocker dans le cache pour 5 minutes
        await cacheService.set(cacheKey, users, 300);
        
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Créer un utilisateur
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        
        // Invalider le cache des utilisateurs
        await cacheService.delete('users:all');
        
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtenir un utilisateur spécifique
router.get('/:id', async (req, res) => {
    try {
        const cacheKey = `user:${req.params.id}`;
        const cachedUser = await cacheService.get(cacheKey);
        
        if (cachedUser) {
            return res.json(cachedUser);
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        await cacheService.set(cacheKey, user, 300);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;