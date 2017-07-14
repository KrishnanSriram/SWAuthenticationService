'use strict';

const express = require('express');
const morgan = require('morgan');
const simpleOauthModule = require('simple-oauth2');
const app = express();
const authConfig = require('./config/authentication');
var oauth2 = null;
var tokenConfig = {};

// Initial page redirecting to Github
app.get('/auth/github', (req, res) => {
    oauth2 = simpleOauthModule.create(authConfig.github);
    // Authorization uri definition
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: 'http://localhost:3000/callback',
        scope: 'notifications',
        state: '3(#0/!~'
    });
    console.log(authorizationUri);
    res.redirect(authorizationUri);
});

// Initial page redirecting to Github
app.get('/auth', (req, res) => {
    oauth2 = simpleOauthModule.create(authConfig.solarwinds);
    // Authorization uri definition
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: 'http://localhost:3000/callback',
        scope: 'notifications',
        state: '3(#0/!~'
    });
    console.log(authorizationUri);
    res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
    console.log('Callback invoked');
    const code = req.query.code;
    const options = {
        code
    };

    oauth2.authorizationCode.getToken(options, (error, result) => {
        if (error) {
            console.dir(error);
            console.error('Access Token Error', error.message);
            return res.redirect('/failure');
        }

        console.log('The resulting token: ', result);
        tokenConfig = oauth2.accessToken.create(result);
        res.redirect('/success');
    });
});

app.get('/success', (req, res) => {
    var finalJSON = tokenConfig;
    finalJSON['message'] = 'We welcome secure user. You are in a secure zone. Have fun';
    res.status(200).json(finalJSON);
});

app.get('/failure', (req, res) => {
    res.status(200).json({ message: 'Failed to authenticate user. Unidentified user' });
});

app.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth/github">Log in with Github</a><br><a href="/auth">Log in with Solarwinds</a>');
});

app.listen(3000, () => {
    console.log('Express server started on port 3000'); // eslint-disable-line
});