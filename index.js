#!/usr/bin/env node
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const autodeployjs = require('./src/autoDeployJs.js');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

if(process.argv.length <= 2) {
    app.use('/:path', (req, res) => {
        const config  = { ...req.body };
        config.path = req.params.path;
        try {
            autodeployjs(config);
            res.status(200).send('Ok.');
        }
        catch (err) {
            console.error(err.message);
            res.status(500).json({
                error: err.message,
            });
        }
    });

    app.listen(6643, _ => {
        console.log('Running at 6643');
    }).on('error', console.log);
}

module.exports = autodeployjs;

if(!module.parent) {
    autodeployjs();
}