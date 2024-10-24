const express = require('express');
const router = express.Router();
const { sendMail } = require('../services/mailer');

router.post('/send-test', async (req, res) => {
    try {
        await sendMail(
            'test@example.com',
            'Test Email',
            'This is a test email from FactorApp'
        );
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;