const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
    // Ne renvoyer que les 8 premiers caractères de la clé pour la sécurité
    const stripeKeyPreview = process.env.STRIPE_API_KEY.substring(0, 8) + '...';
    res.json({ 
        environment: process.env.NODE_ENV,
        stripeKey: stripeKeyPreview 
    });
});

module.exports = router;