const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const saltRounds = 10;



router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 6 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters long').isLength({ min: 8 }),
], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {

        const oldUser = await User.findOne({ email: req.body.email });
        if (oldUser) {
            return res.status(400).json({ success: false, error: "Sorry! A user with this email already exists." });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: secPass
        })

        const authToken = jwt.sign(newUser.id, SECRET_KEY);

        res.json({ success: true, authToken: authToken });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }

})



router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }


    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials." });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials." });
        }

        const authToken = jwt.sign(existingUser.id, SECRET_KEY);
        res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})



module.exports = router;