const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
    try {
        // Check cache first
        const cachedUsers = await getCache('users');
        if (cachedUsers) {
            return res.json(cachedUsers);
        }

        // If not in cache, get from DB
        const users = await User.find().select('-password');
        
        // Store in cache
        await setCache('users', users, 300); // Cache for 5 minutes
        
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password // Note: Dans un vrai projet, il faudrait hasher le mot de passe
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;