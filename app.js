'use strict'

// node modules set up ====================================================
 const  express = require('express'),
            app = express(),						 						
         config = require('./config'),			
         helmet = require('helmet'),
     bodyParser = require('body-parser'),
         jwt    = require('jsonwebtoken');


// Express Middleware settings
app.use(helmet.hidePoweredBy()); // Helmet module for Security Purpose
app.use(bodyParser.urlencoded({'extended': 'true'})); 
app.use(bodyParser.json());



// routes ==================================================================
// ---------------------------------------------------------//
// Express middleware to authenticate and check token       //
// ---------------------------------------------------------//
app.use('/api/*', function (req, res, next) {
    // check authorization header  for token
    let token = req.headers['authorization']; // removes JWT tag from token
    if (token) {
        var token_trim = token.replace(/^JWT\s/, '');
        // verifies secret and decrypts the token
        jwt.verify(token_trim, config.secret, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token. ' + err });
            } else {
                req.user = decoded; // we can use User credentials in every secured api by req.user object
                next(); // calls next middleware
            }
        });
    } else {
        // if there is no token return an 403 error
        return res.status(403).send({
            success: false,
            message: 'Token not provided.'
        });
    }
});

app.use('/', require('./routes'));

// listen (start app with node server.js) ===================================
app.listen(config.port);
console.log("App listening on port " + config.port);
