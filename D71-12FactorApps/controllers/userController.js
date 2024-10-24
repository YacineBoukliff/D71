const User = require('../models/User');

// Créer un utilisateur
exports.createUser = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email
        });
        
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour la dernière connexion
exports.updateLastLogin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.lastLogin = new Date();
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};