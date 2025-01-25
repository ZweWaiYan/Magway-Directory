const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const owasp = require('owasp-password-strength-test');
const xss = require('xss');
const db = require('./database');
const rateLimit = require('express-rate-limit');
const router = express.Router();

owasp.config({
    allowPassphrases       : false,
    maxLength              : 20,
    minLength              : 6,
    minLowercase           : 1,
    minUppercase           : 1,
    minNumbers             : 1,
    minSymbols             : 1
  });

const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 2, 
    message: 'Too many login attempts from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
 
const signupSCHEMA = Joi.object({
    email: Joi.string().email().min(8).max(50).required(),
    username:  Joi.string().pattern(/^[a-zA-Z0-9\s.]*$/).min(3).max(50).optional(),
    password1: Joi.string().min(6).required(),
    age: Joi.string().valid('under_18', 'over_18', 'over_40'),
    region: Joi.string().min(3).max(30).required()
});

router.post('/signup', async (req, res) => {
    const email = xss(req.body.email);
    const username = req.body.username;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const age = xss(req.body.age);
    const region = xss(req.body.region);

    if(password1 != password2){
        return res.status(400).json({message:"Passwords don't match."});
    }else{
        const strongpassword = owasp.test(password1);
        if(!strongpassword.strong){
            return res.status(400).json({errors : strongpassword.errors});
        }
    }

    const { error } = signupSCHEMA.validate({ email, username, password1, age, region });

    if (error) {
        return res.status(400).json({ errors: error.details[0].message });
    }

    try {
        const hashedPassword = await bcrypt.hash(password1, 10);
        const query = `INSERT INTO users (email, username, password, age, region) VALUES (?, ?, ?, ?, ?)`;
        const values = [email, username, hashedPassword, age, region];
        await db.query(query, values);

        res.status(201).json({ message: 'User created successfully.' });

        } catch (err) {
            res.status(500).json({ message: 'Registration Failed.' });
            }
});

module.exports = router;