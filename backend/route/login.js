const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken'); 
const db = require('./database');
const rateLimit = require('express-rate-limit');
const router = express.Router();
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, 
    message: 'Too many login attempts from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const loginSCHEMA = Joi.object({
    email: Joi.string().email().min(8).max(50).required(),
    password: Joi.string().required(),
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const { error } = loginSCHEMA.validate({ email, password });

    if (error) {
        return res.status(400).json({ errors: error.details[0].message });
    }

    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const values = [email];
        const [users] = await db.query(query, values);

        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                user_id: user.id,
                username: user.username,
                role: user.role
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            status: 'Success',
            token: token,
        });

    } catch (err) {
        return res.status(500).json({ message: 'Login Error' });
    }
});

module.exports = router;