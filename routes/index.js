'use strict'

const  jwt    = require('jsonwebtoken'),
       config = require('../config'),
       router = require('express').Router();

// api endpoints starts here---------------------------------------------------------------------
// All apis starts with /api are secured by JWT token


// GET api
router.get('/api/get', (req, res) => {
   res.status(200).json({ status: 'success', message: 'this is a GET request' });
});


// POST api
router.post('/api/post', (req, res) => {
    res.status(200).json({ status: 'success', message: 'this is a POST request' });
});


// PUT api
router.put('/api/put', (req, res) => {
    res.status(200).json({ status: 'success', message: 'this is a PUT request' });
});




//-------- JWT authentication written for User API access ------------//
// getToken api
router.post('/getToken', (req, res) => {
    let username = req.body.username,
        password = req.body.password;
    if (!username || !password) {
        res.json({ success: false, message: 'Authentication failed. User Details incomplete.' });
    }
    else if (username !== config.username || password !== config.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password and username.' });
    } 
    else {
        // create a token after correct credentials
        let payload = { username: config.username, password: config.password };
        let token = jwt.sign(payload, config.secret, {
            expiresIn: 3600
        });   // token expires in 1 hour
        res.json({
            success: true,
            message: 'Please use this token as Authorization header for APIs!',
            token: token
        });
    }
});



// module exports
module.exports = router;
