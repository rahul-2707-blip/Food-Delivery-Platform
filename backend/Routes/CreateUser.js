const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs');
const jwtSecret = "melkflkwenflnclwinfinwekfnldknclsndflnlnlnfi"
// Create User Route
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
    try {
        // Create user
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Login User Route
router.post('/loginuser', [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "E-mail doesn't exist" });
        }
        const pwdCompare = await bcrypt.compare(req.body.password , userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Invalid Password" });
        }
        const data =  {
            user : {
                id : userData.id
            }
        }
        const authToken = jwt.sign(data , jwtSecret)
        return res.json({ success: true , authToken: authToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;
