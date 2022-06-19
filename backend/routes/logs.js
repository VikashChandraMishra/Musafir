const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const fetchUser = require('../middlewares/fetchuser');
const { body, validationResult } = require('express-validator');


router.post('/addlog', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('text', 'Text must be atleast 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const newLog = await Log.create({
            user: req.id,
            title: req.body.title,
            text: req.body.text
        })

        res.json({ success: true, newLog });
    } catch (error) {
        res.status(500).send("Internal Server Error!");
    }

})

router.get('/fetchalllogs', fetchUser, async (req, res) => {

    try {
        const logs = await Log.find({ user: req.id });
        res.json(logs);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})



router.put('/updatelog/:id', fetchUser, async (req, res) => {

    try {
        const { title, text } = req.body;

        const newLog = {};

        if (title) newLog.title = title;
        if (text) newLog.text = text;

        let log = await Log.findById(req.params.id);

        if (!log) res.status(404).send("Log not found!");

        if (log.user.toString() !== req.id)
            return res.status(401).send("Not allowed!"); 

        log = await Log.findByIdAndUpdate(req.params.id, { $set: newLog }, { new: true });

        res.json({ success: true, log });
    } catch (error) {
        res.status(500).send("Internal Server Error!");
    }

})

router.delete('/deletelog/:id', fetchUser, async (req, res) => {

    try {
        let log = await Log.findById(req.params.id);

        if (!log) res.status(404).send("Log not found!");

        if (log.user.toString() !== req.id)
            return res.status(401).send("Not allowed!"); 

        log = await Log.findByIdAndDelete(req.params.id);

        res.json({ success: true, log });
    } catch (error) {
        res.status(500).send("Internal Server Error!");
    }

})

module.exports = router;